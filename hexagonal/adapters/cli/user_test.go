package cli_test

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"

	"github.com/frclba/full-cycle/adapters/cli"
	mock_application "github.com/frclba/full-cycle/application/mocks"
)

func TestRun(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	userName := "Fernando_test"
	userEmail := "fernando+test@educate.io"
	userStatus := "enabled"
	userId := "abc"

	userMock := mock_application.NewMockUserInterface(ctrl)

	userMock.EXPECT().GetName().Return(userName).AnyTimes()
	userMock.EXPECT().GetEmail().Return(userEmail).AnyTimes()
	userMock.EXPECT().GetStatus().Return(userStatus).AnyTimes()
	userMock.EXPECT().GetID().Return(userId).AnyTimes()

	service := mock_application.NewMockUserServiceInterface(ctrl)
	service.EXPECT().Create(userName, userEmail).Return(userMock, nil).AnyTimes()
	service.EXPECT().Get(userId).Return(userMock, nil).AnyTimes()
	service.EXPECT().Enable(gomock.Any()).Return(userMock, nil).AnyTimes()
	service.EXPECT().Disable(gomock.Any()).Return(userMock, nil).AnyTimes()

	resultExpected := fmt.Sprintf("User ID %s with the name %s has been created with the email %s",
		userId, userName, userEmail)

	result, err := cli.Run(service, "create", "", userName, userEmail)
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)

	resultExpected = fmt.Sprintf("User ID %s has been enabled", userEmail)

	result, err = cli.Run(service, "enable", userId, "", "")
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)

	resultExpected = fmt.Sprintf("User ID %s has been disabled", userEmail)
	result, err = cli.Run(service, "disable", userId, "", "")
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)

	resultExpected = fmt.Sprintf("User ID %s\nName:%s\nEmail:%s\nStatus:%s",
		userId, userName, userEmail, userStatus)
	result, err = cli.Run(service, "get", userId, "", "")
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)
}
