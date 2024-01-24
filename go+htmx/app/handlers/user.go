package handlers

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/models"
	"github.com/frclba/slick/app/views/userProfile"
)

func HandleUserProfile(c *slick.Context) error {

	user := models.User{
		FirstName: "Fernando",
		LastName:  "RCLBA",
		Email:     "hemail@email.com",
	}

	return c.Render(userProfile.Index(user))
}
