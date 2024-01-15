package application

type UserService struct {
	Persistence UserPersistenceInterface
}

func NewUserService(persistence UserPersistenceInterface) *UserService {
	return &UserService{
		Persistence: persistence,
	}
}

func (s *UserService) Get(id string) (UserInterface, error) {
	user, err := s.Persistence.Get(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) Create(name string, email string) (UserInterface, error) {
	user := NewUser()
	user.Name = name
	user.Email = email

	_, err := user.IsValid()
	if err != nil {
		return &User{}, err
	}
	result, err := s.Persistence.Save(user)
	if err != nil {
		return &User{}, err
	}
	return result, nil

}

func (s *UserService) Enable(user UserInterface) (UserInterface, error) {
	err := user.Enable()

	if err != nil {
		return &User{}, err
	}

	result, err := s.Persistence.Save(user)
	if err != nil {
		return &User{}, err
	}
	return result, nil
}

func (s *UserService) Disable(user UserInterface) (UserInterface, error) {
	err := user.Disable()

	if err != nil {
		return &User{}, err
	}

	result, err := s.Persistence.Save(user)
	if err != nil {
		return &User{}, err
	}
	return result, nil
}
