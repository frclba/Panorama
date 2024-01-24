package main

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/handlers"
)

func main() {

	app := slick.New()

	app.Get("/profile", handlers.HandleUserProfile)
	app.Start(":3000")

}
