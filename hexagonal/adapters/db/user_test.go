package db_test

import (
	"database/sql"
	"log"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/frclba/full-cycle/adapters/db"
	"github.com/frclba/full-cycle/application"
)

var Db *sql.DB

func setUp() {
	Db, _ = sql.Open("sqlite3", ":memory:")
	createTable(Db)
	createUser(Db)
}

func createTable(db *sql.DB) {
	table := `CREATE TABLE users (
        "id" string,
        "name" string,
        "email" string,
        "status" string
    );`

	stmt, err := db.Prepare(table)
	if err != nil {
		log.Fatal(err.Error())
	}

	stmt.Exec()
}

func createUser(db *sql.DB) {
	insert := `insert into users values ("123", "Fernando", "fernando@educate.io", "disabled" );`
	stmt, err := db.Prepare(insert)
	if err != nil {
		log.Fatal(err.Error())
	}
	stmt.Exec()
}

func TestUserDb_Get(t *testing.T) {
	setUp()
	defer Db.Close()

	userDb := db.NewUserDb(Db)
	user, err := userDb.Get("123")
	require.Nil(t, err)
	require.Equal(t, "Fernando", user.GetName())
	require.Equal(t, "fernando@educate.io", user.GetEmail())
	require.Equal(t, "disabled", user.GetStatus())
}

func TestUserDb_Save(t *testing.T) {
	setUp()
	defer Db.Close()

	userDb := db.NewUserDb(Db)

	user := application.NewUser()
	user.Name = "Fernando"
	user.Email = "fernando@educate.io"

	userResult, err := userDb.Save(user)
	require.Nil(t, err)
	require.Equal(t, user.Name, userResult.GetName())
	require.Equal(t, user.Email, userResult.GetEmail())
	require.Equal(t, user.Status, userResult.GetStatus())

	err = user.Enable()
	require.Nil(t, err)
	userResult, err = userDb.Save(user)
	require.Nil(t, err)
	require.Equal(t, user.Name, userResult.GetName())
	require.Equal(t, user.Email, userResult.GetEmail())
	require.Equal(t, user.Status, userResult.GetStatus())
}
