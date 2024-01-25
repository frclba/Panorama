package handlers

import (
	"github.com/frclba/slick"
	"github.com/frclba/slick/app/infrastructure"
	"github.com/frclba/slick/app/models"
	"github.com/frclba/slick/app/views/userProfile"
)

type UserProfileHandler struct {
	SbClient infrastructure.SupabaseClient
	// ...
}

func NewProfileHandler(sb infrastructure.SupabaseClient) *UserProfileHandler {
	return &UserProfileHandler{
		SbClient: sb,
	}
}

func (h *UserProfileHandler) HandleUserProfile(c *slick.Context) error {

	user := models.User{
		FirstName: "Fernando",
		LastName:  "RCLBA",
		Email:     "hemail@email.com",
	}

	return c.Render(userProfile.Index(user))
}
