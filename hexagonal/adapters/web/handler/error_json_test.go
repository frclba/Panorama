package handler

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestHandler_jsonError(t *testing.T) {
	msg := "test error"
	result := jsonError(msg)
	require.Equal(t, string([]byte(`{"message":"test error"}`)), string(result))
}
