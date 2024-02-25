const Markdown = require('markdown-it');
const Promise = require('bluebird');
const express_params = require('@vbarbarosh/express-helpers/src/express_params');
const fs_path_resolve = require('@vbarbarosh/node-helpers/src/fs_path_resolve');
const fs_read_utf8 = require('@vbarbarosh/node-helpers/src/fs_read_utf8');
const hljs = require('highlight.js');
const json_stringify_stable = require('@vbarbarosh/node-helpers/src/json_stringify_stable');
const request = require('request');
const urlmod = require('@vbarbarosh/node-helpers/src/urlmod');
const urlnorm = require('./helpers/urlnorm');

const md = new Markdown({
    highlight: function (str, language) {
        if (language && hljs.getLanguage(language)) {
            try {
                return hljs.highlight(str, {language, ignoreIllegals: true}).value;
            }
            catch (error) {
            }
        }
        return '';
    }
});

function dev_proxy_routes()
{
    return [
        {req: 'GET /', fn: home},
        {req: 'GET /echo', fn: echo},
        {req: 'GET /proxy', fn: proxy},
        {req: 'ALL *', fn: page404},
    ];
}

async function home(req, res)
{
    const s = await fs_read_utf8(fs_path_resolve(__dirname, '../README.md'));
    res.send(`
        <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css">
        ${md.render(s)}
    `);
}

async function echo(req, res)
{
    res.send(express_params(req));
}

async function proxy(req, res)
{
    req.log(`[proxy_begin]`);

    if (req.query.redirects > 0) {
        const url = urlmod(`${req.headers['x-forwarded-proto'] || 'http'}://${req.headers['host']}${req.path}`, {redirects: (req.query.redirects - 1) || null});
        res.redirect(url);
        end();
        return;
    }

    if (!req.query.url) {
        res.redirect('/');
        end();
        return;
    }

    if (req.query.delay) {
        await Promise.delay(req.query.delay);
    }

    const url = urlnorm(req.query.url);
    req.pipe(request(url, {headers: req.query.headers}).on('error', error_handler)).pipe(res).on('end', end);

    function end() {
        req.log(`[proxy_end_ok]`);
    }
    function error_handler(error) {
        const tmp = {...error, message: error.message, stack: error.stack.split(/\n\s*/)};
        req.log(`[proxy_end_error] ${json_stringify_stable(tmp)}`);
        res.status(400).type('text').send(tmp);
    }
}

async function page404(req, res)
{
    res.status(404).send(`Page not found: ${req.path}`);
}

module.exports = dev_proxy_routes;
