SHELL := bash

setup:
	go install github.com/go-bindata/go-bindata/...

build:
	go-bindata public/ public/bundle/
	go build -ldflags="-s -w"
