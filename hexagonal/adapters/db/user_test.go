package db_test

import (
	"database/sql"
	"log"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/frclba/full-cycle/adapters/db"
)

var Db *sql.DB

func setUp() {
	Db, _ = sql.Open("sqlite3", ":memory:")
	createTable(Db)
	createProduct(Db)
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

func createProduct(db *sql.DB) {
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

	productDb := db.NewUserDb(Db)
	product, err := productDb.Get("123")
	require.Nil(t, err)
	require.Equal(t, "Fernando", product.GetName())
	require.Equal(t, "fernando@educate.io", product.GetEmail())
	require.Equal(t, "disabled", product.GetStatus())

}
