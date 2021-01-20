package main

import (
	"flag"
	"fmt"
	"gopkg.in/antage/eventsource.v1"
	"io/ioutil"
	"log"
	"net/http"
	"sync"
)

var es eventsource.EventSource
var lockState = make(map[string]bool)
var lockMutex = &sync.Mutex{}

func main() {
	es = eventsource.New(nil, func(request *http.Request) [][]byte {
		return [][]byte{[]byte("Access-Control-Allow-Origin: http://localhost:5000")}
	})
	defer es.Close()
	host := flag.String("host", "", "Listen on")
	port := flag.Int("port", 9009, "Listen port for Server")

	flag.Parse()

	http.HandleFunc("/client", clientEvent)
	http.HandleFunc("/unlock", unlock)
	http.HandleFunc("/is-locked", isLocked)
	http.Handle("/events", es)
	http.Handle("/", http.FileServer(AssetFile()))

	log.Printf("Starting webserver at %s:%d\n", *host, *port)
	err := http.ListenAndServe(fmt.Sprintf("%s:%d", *host, *port), nil)
	if err != nil {
		log.Fatalln(err)
	}
}

func clientEvent(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		w.WriteHeader(500)
		return
	}

	log.Println("Incoming request from pd()")
	es.SendEventMessage(string(body), "message", "1")

	pdAction := r.Header.Get("pd-action")
	pdId := r.Header.Get("pd-id")

	if pdAction == "pause" && len(pdId) > 0 {
		lockMutex.Lock()
		lockState[pdId] = true
		lockMutex.Unlock()
		log.Printf("Received lock request for %s\n", pdId)
	}
}

func isLocked(w http.ResponseWriter, r *http.Request) {
	lockMutex.Lock()
	entry, ok := lockState[r.Header.Get("pd-id")]
	defer lockMutex.Unlock()

	if !ok {
		w.Write([]byte("0"))
		return
	}

	if entry {
		w.Write([]byte("1"))
		return
	}

	w.Write([]byte("0"))
}

func unlock(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5000")
	w.Header().Set("Access-Control-Allow-Headers", "pd-id")

	lockMutex.Lock()
	defer lockMutex.Unlock()

	id := r.Header.Get("pd-id")

	_, ok := lockState[id]

	if !ok {
		return
	}

	delete(lockState, id)

	log.Printf("Removed lock for %s\n", id)
}
