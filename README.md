# PHP Dump Server

Dump Server allows you to send your Debug outputs to the Dump Website instead outputting it your website.
This repository contains only the Dumping Server. The client library for PHP can be found [here](https://github.com/shyim/php-dump-client).


## Tech Stack

**Client:** Svelte

**Server:** Go

  
## Installation 

### Binary distribution

* Download the Binary from Releases
* Unpack the release
* Start the binary or install [Systemd service](https://github.com/shyim/php-dump-server/blob/main/php-dump-server.service)

### Docker distribution

```shell
> docker run --name=php-dump-server -p 9009:9009 ghcr.io/shyim/php-dump-server
```

### Package distribution

The Github releases contains packages for `apt`, `rpm` and `apk`. After installation you can start the server with

```shell
> systemctl --user start php-dump-server
```


## Run Locally

```bash
npm install
npm run build

make build
```

To edit the UI you can run `npm run dev` to have a Watch Server at `http://localhost:5000`. Make sure you have still running the Go Server.
## Screenshots

![App Screenshot](https://i.imgur.com/7Ch30ud.png)

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  
