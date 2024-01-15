package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"

	db2 "github.com/frclba/full-cycle/adapters/db"
	"github.com/frclba/full-cycle/application"
)

func main() {
	Db, _ := sql.Open("sqlite3", "sqlite.db")
	userDbAdapter := db2.NewUserDb(Db)
	userService := application.NewUserService(userDbAdapter)
	user, _ := userService.Create("Fernando", "fernando@test.io")

	_, err := userService.Enable(user)
	if err != nil {
		panic(err)
	}
}
