package cmd

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/frclba/full-cycle/adapters/web/server"
)

var httpCmd = &cobra.Command{
	Use:   "http",
	Short: "Runs Http Server",
	Long:  `Runs Http Server`,
	Run: func(cmd *cobra.Command, args []string) {
		server := server.MakeNewWebserver()

		server.Service = &userService
		fmt.Println("Starting server...")

		server.Serve()
	},
}

func init() {
	rootCmd.AddCommand(httpCmd)

}
