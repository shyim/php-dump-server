# PHP Dump Server

Server for the [Client](https://github.com/shyim/php-dump-client)

## Stack:

* UI is build using Svelte
* Webserver is running with Go

The compiled UI will be build into the Binary, so you need to start only the Binary.

# Installation

* Download the latest Version from releases or Build own see below
* Run the dump server
* Open Webbrowser and visit "http://localhost:9009"

# Building

```bash
npm install
npm run build

make build
```

To edit the UI you can run `npm run dev` to have a Watch Server at `http://localhost:5000`. Make sure you have still running the Go Server.
