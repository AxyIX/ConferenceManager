## Описание
Web-приложение эмулятор менеджера конференций.
## Инструкция по запуску/сборке проекта

Для запуска проекта необходимо иметь установленные Node.js и Angular CLI.
Инструкции по установке можно найти на официальных сайтах:
- для Node.js - [https://nodejs.org/en/download/](https://nodejs.org/en/download/ "https://nodejs.org/en/download/")
- для Angular CLI - [https://angular.io/guide/setup-local#step-1-install-the-angular-cli](https://angular.io/guide/setup-local#step-1-install-the-angular-cli "https://angular.io/guide/setup-local#step-1-install-the-angular-cli")

Также, перед запуском/сборкой приложения необходимо выполнить команду в директории проекта:
```
npm install
```
Таким образом, npm установит используемые зависимости.
### Запуск проекта

В директории с проектом выполните команду
```
ng serve -o
```
После этого Angular CLI запустит локальный сервер и откроет приложение в браузере по умолчанию.

### Сборка проекта

В директории с проектом выполните команду
```
ng build --prod
```
Собранное приложение будет доступно в директории `dist`.
