package application

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
)

func TestUserService_GET(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUserPersistence := NewMockUserPersistenceInterface(ctrl)
	mockUserPersistence.EXPECT().Get(gomock.Any()).Return(nil, nil).Times(1)

	service := UserService{
		Persistence: mockUserPersistence,
	}

	_, err := service.Get("abc")
	require.Nil(t, err)
}
