package application_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"

	"github.com/frclba/full-cycle/application"
	mock_application "github.com/frclba/full-cycle/application/mocks"
)

func TestUserService_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	user := mock_application.NewMockUserInterface(ctrl)
	persistence := mock_application.NewMockUserPersistenceInterface(ctrl)
	persistence.EXPECT().Get(gomock.Any()).Return(user, nil).AnyTimes()

	service := application.UserService{
		Persistence: persistence,
	}

	result, err := service.Get("abc")
	require.Nil(t, err)
	require.Equal(t, user, result)
}

func TestUserService_Create(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	user := mock_application.NewMockUserInterface(ctrl)
	persistence := mock_application.NewMockUserPersistenceInterface(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(user, nil).AnyTimes()
	service := application.UserService{
		Persistence: persistence,
	}
	result, err := service.Create("Francisco", "francisco@educate.io")
	require.Nil(t, err)
	require.Equal(t, user, result)
}

func TestUserService_Enable(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	user := mock_application.NewMockUserInterface(ctrl)
	user.EXPECT().Enable().Return(nil).AnyTimes()
}
