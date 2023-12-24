package application
import "errors"
import "strings"
type UserInterface interface {
	isValid() (bool, error)
	Enable() error
	Disable() error
	GetID() string
	GetName() string
	GetEmail() string
	GetStatus() string
}

const (
    STATUS_ENABLED  = "enabled"
    STATUS_DISABLED = "disabled"
)


type User struct {
	ID string
	Name string
	Email string
	Status string
	Password string
}


// func (user *User) isValid() (bool, error) {
// 	return true, nil
// }

func (user *User) Enable() (bool, error) {
	if strings.Contains(user.Email, "@educate.io") {
		user.Status = STATUS_ENABLED
		return true, nil
	}
	return false, errors.New("Invalid email address, not an educate.io email address")
}

func (user *User) Disable() (bool, error) {
	if !strings.Contains(user.Email, "@educate.io") {
		user.Status = STATUS_DISABLED
		return true, nil
	}
	return false, errors.New("The email should not be an educate.io email address to disable it")
}

func (user *User) GetID() (string) {
	return user.ID	
}
func (user *User) GetName() (string) {
	return user.Name
}

func (user *User) GetEmail() (string) {
	return user.Email	
}

func (user *User) GetStatus() (string) {
	return user.Status
}

