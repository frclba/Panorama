package main

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/views/profile"
)

func main() {

	app := slick.New()

	app.Get("/profile", HandleUserProfile)
	app.Start(":3000")

}

func HandleUserProfile(c *slick.Context) error {
	return c.Render(profile.Index())
}
