// Libraries and requirments
require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const Router = require("koa-router");
// Endpoint helpers.
const endpoints = require('./endpoints/sample');
const MySQL = require('./helpers/mysql');

dotenv.config();
const { APP_PORT, SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



// Main server functionality
app.prepare().then(() => {
    // Server instance.
    const server = new Koa(); // Use Koa Middleware for our server.
    server.use(bodyParser());
    const router = new Router(); // Koa router for endpoint calls.
    server.use(session(server)); // Use Koa session control.
    server.keys = [SHOPIFY_API_SECRET_KEY];


    // Custom endpoints...
    // Get sample data.
    router.get('/getSampleDataWithAuth', verifyRequest(), async ctx => { ctx.body = endpoints.sampleData(); }); // Using the Shopify Auth Middleware.
    router.get('/getSampleData', async ctx => { ctx.body = endpoints.sampleData(); }); // Open endpoint.
    // Test MySQL connection.
    router.get('/testMySQL', async ctx => { ctx.body = await MySQL.testConnection(); });
    // Read from MySQL DB.
    router.post('/selectSample', async ctx => { 
        let queryData = ctx.request.body;
        ctx.body = await MySQL.select(queryData);
    });
    // Custom endpoints...

    // Use the Koa router.
    server.use(router.allowedMethods());
    server.use(router.routes())

    // Shopify Auth implementation.
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products'],
            afterAuth(ctx) {
                // Validate shopify.
                const { shop, accessToken } = ctx.session;
                ctx.redirect('/');
            },
        }),
    );

    // Shopify auth function. //
    server.use(verifyRequest());

    // Create a connection.
    server.use(async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
        return
    });

    // Set the port to listen
    server.listen(APP_PORT, () => {
        console.log(`⚡ Running on => :${APP_PORT}`);
    });
});