/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"database/sql"
	"os"

	"github.com/spf13/cobra"

	dbInfra "github.com/frclba/full-cycle/adapters/db"
	"github.com/frclba/full-cycle/application"
)

var action string
var userId string
var userName string
var userEmail string

var db, _ = sql.Open("sqlite3", "sqlite.db")
var userDb = dbInfra.NewUserDb(db)
var userService = application.UserService{Persistence: userDb}

var rootCmd = &cobra.Command{
	Use:   "full-cycle",
	Short: "Full Cycle CLI",
	Long:  `Full Cycle CLI is a simple CLI to manage users in a database`,
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.AddCommand(cliCmd)

	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
