# Инфраструктура

## Команды

Поставить зависимости `npm install` <br>

Запустить проект `npm run start` <br>
Запустить проект c watch (без перезагрузки страницы) `npm run start:dev` <br>

Команда выполняет линт как js, так  и scss файлов `npm lint` <br>
Если хочется отдельно - `npm lint:eslint` и `npm lint:sass` соответственно <br>
Так же есть возможность форматировать scss и js с помощью `npm lint:fix`

Команда для тестов `npm run test` (на данный момент ничего не делает, но к ней есть хук pretest, который выполняет линт)


Выпонить сборку исходников (production) `npm run build` <br>
Выпонить сборку исходников (development) с watch `npm run build:watch`

Запуск сервера `npm run server` <br>
Запуск сервера с watch (без перезагрузки страницы) `npm run server:watch`

Очистка директории куда кладутся собранный исходники `npm run clean` (Вообщем-то и не нужна, так как есть webpack clean)

Команда для клонирования репозитория в контейнер `npm run clone` <br>

Так же поставлен линт на прекомит


## Dockerfile

Создать image `docker build -t udobnaja/local-git .` <br>
Запустить `docker run --rm -it -p 8082:3000 --name udobnaja/local-git`

Изначально собирала по этой статье https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
Но  опять же не знаешь, правильно ли это

## Travis, Heroku

Приложение собирается через Travis и деплоится Heroku в случае успешного выполнения
Есть два стенда:
    staging  (https://still-inlet-21388.herokuapp.com/)
    production (https://git-log-production.herokuapp.com/term) - на момент написания репозитория он не работает,
    так как туда не клонится репозиторий

    Pipeline с pull-requset я не проверяла

Задание мне показалось сложным, особенно в такие сжатые сроки, если ты никогда с таким не сталкивался.
Логи скудные и вообще порой непонятно, что пошло не так.



