export function assembleUrl(path) {
    let url = '';

    if (!isProduction) {
        url = 'http://localhost:9009';
    }

    return url + path;
}
