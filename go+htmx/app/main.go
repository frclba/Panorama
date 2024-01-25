package main

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/handlers"
	"github.com/frclba/slick/app/infrastructure"
	"github.com/frclba/slick/app/middlewares"
)

func main() {

	app := slick.New()
	app.PlugMiddleware(middlewares.WithAuth)
	app.PlugMiddleware(middlewares.WithRequestID)

	profileHandler := handlers.NewProfileHandler(&infrastructure.NOOPSB{})

	app.Get("/profile", profileHandler.HandleUserProfile)
	app.Get("/dashboard", handlers.HandleDashboard)
	app.Start(":3000")

}
