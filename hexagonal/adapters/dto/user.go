package dto

import "github.com/frclba/full-cycle/application"

type User struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Status string `json:"status"`
}

func NewUser() *User {
	return &User{}
}

func (u *User) Bind(user *application.User) (*application.User, error) {
	if u.ID != "" {
		user.ID = u.ID
	}

	user.Name = u.Name
	user.Email = u.Email
	user.Status = u.Status

	_, err := user.IsValid()
	if err != nil {
		return &application.User{}, err
	}
	return user, nil
}
