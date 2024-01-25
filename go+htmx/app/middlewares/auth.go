package middlewares

import "github.com/frclba/slick"

func WithAuth(h slick.Handler) slick.Handler {
	return func(c *slick.Context) error {
		c.Set("email", "fernando@educate.io")
		return h(c)
	}
}
