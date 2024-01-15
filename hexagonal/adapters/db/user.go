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

func (u *UserDb) Save(user application.UserInterface) (application.UserInterface, error) {
	var err error
	var rows int
	u.db.QueryRow("SELECT COUNT(*) FROM users WHERE id = ?", user.GetID()).Scan(&rows)

	if rows == 0 {
		_, err = u.create(user)
	} else {
		_, err = u.update(user)
	}

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *UserDb) create(user application.UserInterface) (application.UserInterface, error) {
	stmt, err := u.db.Prepare("INSERT INTO users(id, name, email, status) VALUES(?,?,?,?)")
	if err != nil {
		return nil, err
	}

	_, err = stmt.Exec(
		user.GetID(),
		user.GetName(),
		user.GetEmail(),
		user.GetStatus(),
	)

	if err != nil {
		return nil, err
	}

	err = stmt.Close()
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *UserDb) update(user application.UserInterface) (application.UserInterface, error) {
	_, err := u.db.Exec("UPDATE users SET name = ?, email = ?, status = ? WHERE id = ?",
		user.GetName(),
		user.GetEmail(),
		user.GetStatus(),
		user.GetID())
	if err != nil {
		return nil, err
	}

	return user, nil
}
