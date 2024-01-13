package application

import (
	"errors"
	"strings"

	"github.com/asaskevich/govalidator"
	uuid "github.com/satori/go.uuid"
)

func init() {
	govalidator.SetFieldsRequiredByDefault(true)
}

type UserInterface interface {
	isValid() (bool, error)
	Enable() error
	Disable() error
	GetID() string
	GetName() string
	GetEmail() string
	GetStatus() string
}

type UserReader interface {
	Get(id string) (UserInterface, error)
}

type UserWriter interface {
	Save(user UserInterface) (UserInterface, error)
}

type UserPersistenceInterface interface {
	UserReader
	UserWriter
}

type UserServiceInterface interface {
	Get(id string)
	Create(name string, email string) (UserInterface, error)
	Enable(user UserInterface) (UserInterface, error)
	Disable(user UserInterface) (UserInterface, error)
}

const (
	STATUS_ENABLED  = "enabled"
	STATUS_DISABLED = "disabled"
)

type User struct {
	ID     string `valid:"uuidv4"`
	Name   string `valid:"required"`
	Email  string `valid:"email,required"`
	Status string `valid:"required"`
}

func NewUser() *User {
	user := User{
		ID:     uuid.NewV4().String(),
		Status: STATUS_DISABLED,
	}
	return &user
}

func (user *User) isValid() (bool, error) {
	if user.Status == "" {
		user.Status = STATUS_DISABLED
	}
	if user.Status != STATUS_ENABLED && user.Status != STATUS_DISABLED {
		return false, errors.New("invalid status value")
	}
	if !strings.Contains(user.Email, "@educate.io") {
		return false, errors.New("invalid email address, not an educate.io email address")
	}
	_, err := govalidator.ValidateStruct(user)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (user *User) Enable() (bool, error) {
	if strings.Contains(user.Email, "@educate.io") {
		user.Status = STATUS_ENABLED
		return true, nil
	}
	return false, errors.New("invalid email address, not an educate.io email address")
}

func (user *User) Disable() (bool, error) {
	if !strings.Contains(user.Email, "@educate.io") {
		user.Status = STATUS_DISABLED
		return true, nil
	}
	return false, errors.New("the email should not be an educate.io email address to disable it")
}

func (user *User) GetID() string {
	return user.ID
}
func (user *User) GetName() string {
	return user.Name
}

func (user *User) GetEmail() string {
	return user.Email
}

func (user *User) GetStatus() string {
	return user.Status
}
