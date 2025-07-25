### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как коммитить в проект?

Для автоматической генерации коммита можно использовать команду `yarn commit`, перед его отправкой также будет произведена проверка с использованием `commitlint`

### Как управлять зависимостями?

В этом проекте используется [`yarn workspaces`](https://yarnpkg.com/features/workspaces)

Чтобы добавить зависимость для клиента 
```yarn workspace client add [PACKAGES_NAMES] [FLAGS]```

Пример
```yarn workspace client add react react-dom```

Чтобы добавить зависимость для сервера 
```yarn workspace server add [PACKAGES_NAMES] [FLAGS]```

Пример
```yarn workspace server add nodemon -D```

Чтобы добавить глобальные зависимости для всего проекта
```yarn add [PACKAGES_NAMES] [FLAGS] -W```

Пример
```yarn add lerna -D -W```

Удаление зависимостей происходит аналогично добавлению, только вместо `add`, необходимо использовать `remove`

Пример
```yarn workspace server remove dotenv```

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

# Переменные окружения для игрового движка
Храниться в файле .env
### Сцена
VITE_CANVAS_WIDTH = 800
VITE_CANVAS_HEIGHT = 600
VITE_PLAYER_WIDTH = 50
VITE_PLAYER_HEIGHT = 20
VITE_ENEMY_WIDTH = 40
VITE_ENEMY_HEIGHT = 20
VITE_BULLET_WIDTH = 4
VITE_BULLET_HEIGHT = 10
### Скорость
VITE_SPEED_PALYER = 200
VITE_SPEED_ENEMY = 50
VITE_SPEED_BULLET = 300
