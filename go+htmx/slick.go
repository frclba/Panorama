package slick

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/a-h/templ"
	"github.com/julienschmidt/httprouter"
)

type Context struct {
	response http.ResponseWriter
	request  *http.Request
	ctx      context.Context
}

func (c *Context) Render(component templ.Component) error {
	return component.Render(c.ctx, c.response)
}

type Handler func(c *Context) error

type ErrorHandler func(error, *Context) error

type Slick struct {
	ErrorHandler ErrorHandler
	router       *httprouter.Router
	middlewares  []Middleware
}
type Middleware func(Handler) Handler

func New() *Slick {
	return &Slick{
		router:       httprouter.New(),
		ErrorHandler: defaultErrorHandler,
	}
}

func (s *Slick) PlugMiddleware(middlewares ...Middleware) {
	s.middlewares = append(s.middlewares, middlewares...)
}

func (c *Context) Set(key any, value any) {
	c.ctx = context.WithValue(c.ctx, key, value)
}

func (c *Context) Get(key string) any {
	return c.ctx.Value(key)
}

func (s *Slick) Start(port string) error {
	return http.ListenAndServe(port, s.router)
}

func (s *Slick) Get(path string, h Handler, plugs ...Handler) {
	s.router.GET(path, s.makeHTTPRouterHandler(h))
}

func (s *Slick) makeHTTPRouterHandler(h Handler) httprouter.Handle {

	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {

		ctx := &Context{
			response: w,
			request:  r,
			ctx:      context.Background(),
		}

		for i := len(s.middlewares) - 1; i >= 0; i-- {
			h = s.middlewares[i](h)
		}

		if err := h(ctx); err != nil {
			// TODO handle the error from the error handler huh?
			s.ErrorHandler(err, ctx)
		}

	}
}

func defaultErrorHandler(err error, c *Context) error {
	slog.Error("error", "err", err)
	return nil
}
