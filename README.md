# Blog engine

### Setting env variables

Since the app requires API key, you can change it through environment variables.

Changing the env variables can be done in `./client/Dockerfile`

note: since it is just an exercise I have included my own API key and username and password for better testing, you can view the password in the mentioned Dockerfile

Available env variables:

- VITE_API_BASE_URL
- VITE_API_KEY
- VITE_USERNAME
- see `./client/Dockerfile`

### Running the app

- in root folder of this repo run `sudo docker compose build`
- after building is finished run `sudo docker compose up`
- the app is available at `localhost:3000`

**alternative for running locally**

- `cd` client
- run `yarn && yarn dev`
- note: environment variables will have to be set with either `.env` file or through **CLI**

### Notes
- For a blog application, I would probably use Next.js instead of pure SPA. SSR could be beneficial for such application (caching, SEO). However, this was not allowed in the requirements.

> display a list of all articles, ordered by date descending

- Since the api does not have ordering functionality on the server, I have not included this. I have implemented pagination so ordering on the client would not yield proper result.

> comment API

- The comment API was returning 500 even though I checked I was following the spec from swagger. However, the implementation of comments should work if the server does not error out. Not sure what could be wrong.

#### Backend

- Because I have spent considerable amount of time on the client implementation, I have not implemented the backend side. So instead I will describe how I would implement it and if needed I could implement it later on.
- I would use a web framework `Express.js`, add proper routing and use an **MVC**-like architecture that sepearets the logic into `controllers`, `services` and `models`.
- My favorite folder structure is to group by components / features and not by roles. A rough draft could look something like this:

```
.
└── server/
    ├── node_modules
    ├── package.json
    └── src/
        └── components/
            ├── router
            ├── article/
            │   ├── article-controller.ts
            │   ├── article-router.ts
            │   ├── article-model.ts
            │   ├── article-service.ts
            │   ├── article-service.test.ts
            │   └── article-test.ts
            ├── auth/
            │   ├── auth-controller.ts
            │   ├── auth-service.ts
            │   └── auth-middleware.ts
            └── user/
                └── ...
```

- For database I would proabably use a quite new ORM called `drizzle` or `prisma`.
- For the login I would use `JWT` with both access and refresh tokens with rotation. The auth implementation in the provided API only gives access token in response body and since we want the auth to presist on browser refresh, storing it in local storage is our only option. This however can introduce vulnarabilites like XSS. For reference of how I would do this, I have implemented this already in a different project of mine, here is the link: [auth implementation](https://github.com/ciza99/overload/blob/main/server/src/utils/trpc.ts). The project uses tRPC instead of REST for communication but the approach is the same.
- For testing I would use `jest`. Again, I refer to the already mention project where you can view [usage of jest](https://github.com/ciza99/overload/blob/main/server/src/components/user/user-service.test.ts) with service and database mocking.
- To see how I would go about running everything in Docker including the database you can view [this project](https://github.com/ciza99/luxonis/tree/main).
- Another project where I have done backend in Node.js is my bachelor thesis. It can be seen here: [thesis-server](https://gitlab.fi.muni.cz/xcizek3/thesis-server). However, this was implemented a long time ago (~ 3 years ago) and I have gained a lot of knowledge from that point on. So take that project with a grain of salt, I would do things quite differently now.

### Closing thoughts
I hope the description and reffered projects gave you some insight on how I would go about implementing the backend. I am open to any questions regarding the implementation.
