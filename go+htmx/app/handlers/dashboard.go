package handlers

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/views/dashboard"
)

func HandleDashboard(c *slick.Context) error {

	return c.Render(dashboard.Index())
}
