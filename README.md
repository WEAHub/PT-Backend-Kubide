<p align="center">
  <a href="http://kubide.io/" target="blank"> <img src="https://adalab.es/wp-content/uploads/2022/09/logo_0000s_0036_Kubide.png" width="200" alt="Kubide logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="http://kubide.io/" target="blank"> <img src="https://kubide.es/wp-content/uploads/2016/06/logotipo-blanco-300.png" width="200" alt="Kubide logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Prueba tecnica desarrollada en <a href="http://nodejs.org" target="_blank">Node.js</a>, <a href="https://nestjs.com/" target="_blank">NestJS</a> y <a href="https://mysql.com/" target="_blank">MySQL</a></p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Swagger
- `http://localhost:3000/api` para entrar al swagger.

## Autentificación
 - `POST` /auth/login
 - `POST` /auth/signup

## Usuarios
- `GET` /users/activeUsers
- `GET` /users/getUserInfo
- `PATCH` /users/setStatus
- `PATCH` /users/updateUser
- `PUT` /users/changePassword

## Mensajes
- `GET` /messages/getMessages
- `POST` /messages/sendMessage

## Notificaciones
- `GET` /notifications/getNotifications

## Instalación

```bash
$ npm install
```

## Ejecutando el app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Docker
```bash
docker composer up
```

## Soporte

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
