package cli

import (
	"fmt"

	"github.com/frclba/full-cycle/application"
)

func Run(service application.UserServiceInterface, action string, userId string, userName string, userEmail string) (string, error) {

	var result = ""

	switch action {
	case "create":
		user, err := service.Create("Fernando", "fernando@educate.io")
		if err != nil {
			return "", err
		}
		result = fmt.Sprintf("User ID %s with the name %s has been created with the email %s",
			user.GetID(), user.GetName(), user.GetEmail())
	case "enable":
		user, err := service.Get(userId)
		if err != nil {
			return "", err
		}
		res, err := service.Enable(user)
		if err != nil {
			return "", err
		}
		result = fmt.Sprintf("User ID %s has been enabled", res.GetEmail())
	case "disable":
		user, err := service.Get(userId)
		if err != nil {
			return "", err
		}
		res, err := service.Disable(user)
		if err != nil {
			return "", err
		}
		result = fmt.Sprintf("User ID %s has been disabled", res.GetEmail())
	default:
		res, err := service.Get(userId)
		if err != nil {
			return "", err
		}
		result = fmt.Sprintf("User ID %s\nName:%s\nEmail:%s\nStatus:%s",
			res.GetID(), res.GetName(), res.GetEmail(), res.GetStatus())
	}
	return result, nil
}
