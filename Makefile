SHELL := bash

setup:
	npm install

build:
	npm run build
	go build -ldflags="-s -w"
