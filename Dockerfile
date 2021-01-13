FROM scratch
ENTRYPOINT ["/php-dump-server"]
EXPOSE 9009
COPY php-dump-server /