Proxy server for developers

```bash
npm start &
curl http://127.0.0.1:3000/echo
curl http://127.0.0.1:3000/proxy?url=https://ip.guide&headers[accept]=*/*
curl http://127.0.0.1:3000/proxy?url=https://ip.guide&headers[accept]=*/*&delay=50000
curl http://127.0.0.1:3000/proxy?url=https://ip.guide&headers[accept]=*/*&redirects=3
fg
```

## Use cases

1. basic: fetch specified url
2. timeout: return response after specified **delay**
3. throttle: return response with the specified **speed**
4. redirects: redirect several times before performing request
