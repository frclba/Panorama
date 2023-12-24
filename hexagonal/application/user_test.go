package application

import (
	"testing"

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
	require.Equal(t, "Invalid email address, not an educate.io email address", err.Error())
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
	require.Equal(t, "The email should not be an educate.io email address to disable it", err.Error())
}