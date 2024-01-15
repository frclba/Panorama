package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"

	"github.com/frclba/full-cycle/application"
)

type UserDb struct {
	db *sql.DB
}

func NewUserDb(db *sql.DB) *UserDb {
	return &UserDb{db: db}
}

func (u *UserDb) Get(id string) (application.UserInterface, error) {
	var user application.User

	stmt, err := u.db.Prepare("SELECT id, name, email, status FROM users WHERE id = ?")
	if err != nil {
		return nil, err
	}

	err = stmt.QueryRow(id).Scan(&user.ID, &user.Name, &user.Email, &user.Status)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
