package application

import (
	"testing"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
)

func TestUserEnable(t *testing.T) {
	user := User{}
	user.Name = "Fernando"
	user.Status = STATUS_DISABLED
	user.Email = "fernando@educate.io"

	success, err := user.Enable()
	require.True(t, success)
	require.Nil(t, err)

	user.Email = "fernando@growyouragency.com"
	success, err = user.Enable()
	require.False(t, success)
	require.Equal(t, "invalid email address, not an educate.io email address", err.Error())
}

func TestUserDisable(t *testing.T) {
	user := User{}
	user.Name = "Fernando"
	user.Status = STATUS_ENABLED
	user.Email = "fernando@growyouragency.com"
	success, err := user.Disable()
	require.True(t, success)
	require.Nil(t, err)

	user.Email = "fernando@educate.io"
	success, err = user.Disable()
	require.False(t, success)
	require.Equal(t, "the email should not be an educate.io email address to disable it", err.Error())
}

func TestUserIsValid(t *testing.T) {
	user := User{}
	user.ID = uuid.NewV4().String()
	user.Name = "Fernando"
	user.Status = STATUS_DISABLED
	user.Email = "fernando@educate.io"

	success, err := user.isValid()
	require.Nil(t, err)
	require.True(t, success)

	user.Status = "invalid status"
	success, err = user.isValid()
	require.Equal(t, "invalid status value", err.Error())

	user.Status = STATUS_ENABLED
	success, err = user.isValid()
	require.Nil(t, err)

	user.Email = "fernando@gmail.com"
	success, err = user.isValid()
	require.Equal(t, "invalid email address, not an educate.io email address", err.Error())
}
