package infrastructure

type SupabaseClient interface {
	Auth(foo string) error
	// ...
	// WHATEVER IT NEEDS TO DO
}

type NOOPSB struct{}

func (NOOPSB) Auth(foo string) error {
	return nil
}
