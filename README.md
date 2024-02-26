A proxy server for development

```bash
npm start &
curl http://127.0.0.1:3000/echo
curl 'http://127.0.0.1:3000/proxy?url=https://ip.guide&headers[accept]=*/*'
curl 'http://127.0.0.1:3000/proxy?url=https://ip.guide&headers[accept]=*/*&delay=50000'
curl 'http://127.0.0.1:3000/proxy?url=https://ip.guide&headers[accept]=*/*&redirects=3'
curl 'http://127.0.0.1:3000/proxy?url=https://mirror.ihost.md/ubuntu-releases/22.04.3/ubuntu-22.04.3-desktop-amd64.iso&throttle=1k'
curl 'http://127.0.0.1:3000/proxy?url=https://mirror.ihost.md/ubuntu-releases/22.04.3/ubuntu-22.04.3-desktop-amd64.iso&throttle=256k'
curl 'http://127.0.0.1:3000/proxy?url=https://mirror.ihost.md/ubuntu-releases/22.04.3/ubuntu-22.04.3-desktop-amd64.iso&throttle=1m'
curl 'http://127.0.0.1:3000/proxy?url=https://mirror.ihost.md/ubuntu-releases/22.04.3/ubuntu-22.04.3-desktop-amd64.iso&throttle=5m'
fg
```

## Docker

```bash
docker run --rm -p 3000:3000 vbarbarosh/dev-proxy
```

## Use cases

1. basic: fetch specified url
2. timeout: return response after specified **delay**
3. throttle: return response with the specified **speed**
4. redirects: redirect several times before performing request
