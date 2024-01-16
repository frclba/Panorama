/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/spf13/cobra"

	"github.com/frclba/full-cycle/adapters/cli"
)

// cliCmd represents the cli command
var cliCmd = &cobra.Command{
	Use:   "cli",
	Short: "Full Cycle CLI",
	Long:  `Full Cycle CLI is a simple CLI to manage users in a database`,
	Run: func(cmd *cobra.Command, args []string) {
		res, _ := cli.Run(&userService, action, userId, userName, userEmail)
		println(res)
	},
}

func init() {
	rootCmd.AddCommand(cliCmd)

	cliCmd.Flags().StringVarP(&action, "action", "a", "enable", "Enable / Disable user")
	cliCmd.Flags().StringVarP(&userId, "id", "i", "", "User Id")
	cliCmd.Flags().StringVarP(&userName, "user", "n", "", "User Name")
	cliCmd.Flags().StringVarP(&userEmail, "email", "e", "", "User Email")
}
