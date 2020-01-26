package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

const (
	Minor = 1
	Major = 2
)

var SeverityMap = map[string]string{"Minor": "0", "Major": "1"}

// type FireLocation struct {
// 	Latitude  float64
// 	Longitude float64
// 	Severity  int
// 	Date      time.Date
// }

/*
 latitude, longitude, severity, date


*/

// var fireLocations []FireLocation

func main() {
	// fireLocations = make([]FireLocation, 0)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// fmt.Println(r.PostFormValue("latitude"), r.PostFormValue("longitude"), r.PostFormValue("severity"))
		if r.PostFormValue("latitude") != "" && r.PostFormValue("longitude") != "" && r.PostFormValue("severity") != "" {
			f2, _ := os.Open("csv/firelocations.csv")
			bytes, _ := ioutil.ReadAll(f2)
			str := string(bytes)
			lines := strings.Split(str, "\n")
			for _, line := range lines {
				tokens := strings.Split(line, ",")
				if len(tokens) != 4 {
					continue
				}
				if tokens[0] == r.PostFormValue("latitude") {

					http.ServeFile(w, r, "html/index.html")
					return
				}
				if tokens[1] == r.PostFormValue("longitude") {

					http.ServeFile(w, r, "html/index.html")
					return
				}
			}
			f2.Close()
			f, _ := os.OpenFile("csv/firelocations.csv", os.O_APPEND, os.ModeAppend)
			// if err != nil {
			// 	log.Println(err)
			// }
			defer f.Close()
			f.WriteString(r.PostFormValue("latitude") + ",")
			f.WriteString(r.PostFormValue("longitude") + ",")
			f.WriteString(r.PostFormValue("severity") + ",")
			f.WriteString(time.Now().Format(time.RFC3339) + "\n")
			// fmt.Println(SeverityMap[r.FormValue("severity")])
			//TODO: delete form values when done
			// fmt.Println(r.FormValue("latitude"), r.FormValue("longitude"))
		}
		fmt.Println(r)
		fmt.Println("here!")
		http.ServeFile(w, r, "html/index.html")
	})
	http.HandleFunc("/loc.html", func(w http.ResponseWriter, r *http.Request) {
		// if err := r.ParseForm(); err != nil {
		// 	// handle error
		// 	log.Println(err)
		// }
		fmt.Println(r.FormValue("latitude"), r.FormValue("longitude"), r.FormValue("severity"))
		if r.FormValue("latitude") != "" && r.FormValue("longitude") != "" && r.FormValue("severity") != "" {
			f, err := os.OpenFile("csv/firelocations.csv", os.O_APPEND, os.ModeAppend)
			defer f.Close()
			if err != nil {
				log.Println(err)
			}
			f.WriteString(r.FormValue("latitude") + ",")
			f.WriteString(r.FormValue("longitude") + ",")
			f.WriteString(r.FormValue("severity") + ",")
			f.WriteString(time.Now().Format(time.RFC3339) + "\n")
			fmt.Println(r.FormValue("severity"))
			//TODO: delete form values when done
			fmt.Println(r.FormValue("latitude"), r.FormValue("longitude"))
		}
		http.ServeFile(w, r, "html/NewLocation.html")
	})
	http.HandleFunc("/src/main.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "html/js/main.js")
	})

	http.HandleFunc("/src/main.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "html/js/main.css")
	})

	http.HandleFunc("/src/firelocations.csv", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "csv/firelocations.csv")
	})

	http.ListenAndServe(":8080", nil)
}
