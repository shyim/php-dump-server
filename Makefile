SHELL := bash

setup:
	go install github.com/go-bindata/go-bindata/...

build:
	npm run build
	go-bindata -fs -prefix "public/" public/ public/build
	go build -ldflags="-s -w"
