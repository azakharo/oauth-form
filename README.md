# Форма авторизации OAuth 

## Полезные ссылки

* [Figma mockup](https://www.figma.com/design/5UrARVqMLyo9AMtXAFA8CK/%D0%9B%D0%B5%D0%BD%D1%82%D0%B0-(%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8)?node-id=7493-3306&t=MkcILWfCXbOg8skx-0)
* [Task in Jira with the requirements and API description](https://asdcor.atlassian.net/browse/LM-2171)
* [Demo on vercel](https://oauth-form.vercel.app/)


## Quick start for the development

First install dependencies:

```sh
npm install
```

To run in the development mode with hot module reloading:

```sh
npm start
```

That command opens http://localhost:4000 page in your browser.


## Building the production version

```sh
npm run build
```
See "dist" folder for results.

To run the production build:

```sh
npm run preview
```


## Linting and type checking

Run linting:

```sh
npm run lint
```

Run type checking:

```sh
npm run ts
```

## Deploy to production

```sh
<ssh to production server>
cd <any working directory you want>
<git fetch and checkout any-branch-or-master>
docker-compose build --build-arg mode="production"
docker-compose up -d
```

After running those commands the application will be started on the production server on port 8082.  
The port number can be changed in `./docker-compose.yml`
