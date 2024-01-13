package application

type UserService struct {
	Persistence UserPersistenceInterface
}

func (s *UserService) Get(id string) (UserInterface, error) {
	user, err := s.Persistence.Get(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}
