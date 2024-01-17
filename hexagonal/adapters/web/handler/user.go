package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/urfave/negroni"

	"github.com/frclba/full-cycle/adapters/dto"
	"github.com/frclba/full-cycle/application"
)

func MakeUserHandlers(r *mux.Router, n *negroni.Negroni, service application.UserServiceInterface) {
	r.Handle("/user/{id}", n.With(
		negroni.Wrap(getUser(service)),
	)).Methods("GET", "OPTIONS")

	r.Handle("/user", n.With(
		negroni.Wrap(createUser(service)),
	)).Methods("GET", "OPTIONS")
}

func createUser(service application.UserServiceInterface) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		var userDto dto.User
		err := json.NewDecoder(r.Body).Decode(&userDto)
		checkError(w, err)
		user, err := service.Create(userDto.Name, userDto.Email)
		checkError(w, err)
		err = json.NewEncoder(w).Encode(user)
		checkError(w, err)
	})
}

func getUser(service application.UserServiceInterface) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		vars := mux.Vars(r)
		id := vars["id"]
		user, err := service.Get(id)
		checkError(w, err)
		err = json.NewEncoder(w).Encode(user)
		checkError(w, err)
	})
}

func checkError(w http.ResponseWriter, err error) {
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(jsonError(err.Error()))
		return
	}
}
