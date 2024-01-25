package middlewares

import (
	"github.com/google/uuid"

	"github.com/frclba/slick"
)

func WithRequestID(h slick.Handler) slick.Handler {
	return func(c *slick.Context) error {
		c.Set("requestID", uuid.New())
		return h(c)
	}
}
