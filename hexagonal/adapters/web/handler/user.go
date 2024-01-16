package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/urfave/negroni"

	"github.com/frclba/full-cycle/application"
)

func MakeUserHandlers(r *mux.Router, n *negroni.Negroni, service application.UserServiceInterface) {
	r.Handle("/user/{id}", n.With(
		negroni.Wrap(getUser(service)),
	)).Methods("GET", "OPTIONS")
}

func getUser(service application.UserServiceInterface) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		vars := mux.Vars(r)
		id := vars["id"]
		user, err := service.Get(id)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write(jsonError("Error getting the user"))
			return
		}
		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write(jsonError("Error encoding the user"))
			return
		}
	})
}
