package main

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/handlers"
)

func main() {

	app := slick.New()
	app.PlugMiddleware(withAuth)
	app.Get("/profile", handlers.HandleUserProfile)
	app.Get("/dashboard", handlers.HandleDashboard)
	app.Start(":3000")

}

func withAuth(h slick.Handler) slick.Handler {
	return func(c *slick.Context) error {
		c.Set("email", "fernando@educate.io")
		return h(c)
	}
}
