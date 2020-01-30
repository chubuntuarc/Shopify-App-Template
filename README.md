<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chubuntuarc/Shopify-App-Template/">
    <img src="src/assets/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Shopify Custom App Template</h3>

  <p align="center">
    Template to build a custom private app implementation.
    <br />
    <a href="https://github.com/chubuntuarc/Shopify-App-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/chubuntuarc/Shopify-App-Template/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [How it works](#how-it-works)

<!-- ABOUT THE PROJECT -->
## About The Project

Template to build a custom private app implementation.
Tha base of this template was created based on the specifications of the Shopify App Development documentation.
https://developers.shopify.com/tutorials/build-a-shopify-app-with-node-and-react/set-up-your-app

### Built With
Technologies and apps in this App.
* [NodeJS 10+](https://nodejs.org/en/about/)
* [React JS](https://reactjs.org/docs/getting-started.html)
* [Next JS](https://nextjs.org/docs)
* [MySQL](https://dev.mysql.com/doc/)
* [Ngrok](https://ngrok.com/docs)
* [Koa](https://github.com/koajs/koa)
* [Koa Shopify Auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth)
* [Shopify Polaris](https://polaris.shopify.com/components/get-started)

## Getting Started
Clone the repo, then run the node commands.

### How it works

clone the repo.

```javascript
git clone {thisRepoUrl}.gti
```

Install the dependencies.

```javascript
npm install
```

Run the project

```javascript
DEV MODE
npm run dev

DEV SERVER
ngrok http {port}

...............................
PRODUCTION MODE
npm run build
npm run start

Change the .env BASE_PATH
=> BASE_PATH=/route/to/Custom-App-Folder

```

## DEV Notes

```
* Main view.
./pages/index.js

* To create a testing server run, and can been tested on a store.
ngrok http {port}

* To connect your app with a shopify store, set the keys on the .env file.
SHOPIFY_API_KEY='YOUR API KEY FROM SHOPIFY PARTNERS DASHBOARD'
SHOPIFY_API_SECRET_KEY='YOUR API SECRET KEY FROM SHOPIFY PARTNERS DASHBOARD'

* Main server functionality on
 app.prepare()  from ./server.js

* To test the server without shopify auth, comment this:
  server.use(verifyRequest()); on ./server.js

* Replace the MYSQL connection params from .env.

>> Sample endpoints <<
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
```
