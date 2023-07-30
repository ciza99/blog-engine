# Blog engine

### Setting env variables

Since the app requires API key, you can change it through environment variables
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

> display a list of all articles, ordered by date descending
> since the api does not have ordering functionality on the server, I have not included this. I have implemented pagination so ordering on the client would not yield proper result.

the comment API was returning 500 even though I checked I was following the spec from swagger. However, the implementation of comments should work if the server does not error out.

#### Backend

- Since I have spent already considerable amount of time on the client implementation, so far I have not implemented the backend side as well. So instead I will describe how I would implement it and if you would really like me to do it as well I could implement the backend in the future. Right now I dont have much time.
- I would use a web framework `Express.js`, add the proper routes.
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

- For database I would proabably use `drizzle` or `prisma`
- For the login I would use `JWT` with both access and refresh tokens. The auth implementation in the provided API only gives access token in response body and since we want the auth to presist on browser refresh, storing it in local storage is our only option. This however can introduce vulnarabilites like XSS. For reference of how I would do this, I have implemented this already in a different project of mine, here is the link: [auth implementation](https://github.com/ciza99/overload/blob/main/server/src/utils/trpc.ts). The project uses tRPC instead of REST for communication but the approach is the same.
- Another project where I have done backend is my bachelor thesis which can be seen here: [thesis-server](https://gitlab.fi.muni.cz/xcizek3/thesis-server). Even though this was implemented a long time ago and I have gained a lot of knowledge from that point. I would do things quite differently.
