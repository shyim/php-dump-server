SHELL := bash

setup:
	npm install

build:
	npm run build
	go build -ldflags="-s -w"

send-test-message:
	curl -X POST -d '{"uuid":"58db1cc5-36b2-4a8a-a493-99eadeb9bc0b","origin":{"fileName":"pd-test.php","lineNumber":23},"time":1618859193.43804,"tags":[],"payloads":[{"type":"pause"}]}' http://localhost:9009/client
	curl -X POST -d '{"uuid":"61cf19cd-c3bf-4228-a308-15b3e78d4101","origin":{"fileName":"pd-test.php","lineNumber":12},"time":1618859192.435765,"tags":[],"payloads":[{"type":"html","content":"<b>Html Code here</b>"}]}' http://localhost:9009/client