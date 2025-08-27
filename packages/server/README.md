# Forum API Server

Сервер API для форума

## Особенности

- **Защищенные API endpoints** - требуют авторизации для создания контента
- **Sequelize ORM** с PostgreSQL
- **Swagger документация** на `/api-docs`
- **CORS поддержка** для фронтенда

## 📋 Требования

- Node.js 16+
- PostgreSQL
- Переменные окружения настроены

## ⚙️ Настройка

Создайте файл `.env` в корне проекта:

```bash
# Server Configuration
SERVER_PORT=3001

# Database Configuration
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
POSTGRES_PORT=5432

# CORS Configuration (comma-separated list of allowed origins)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://yourdomain.com
```

## 🏃‍♂️ Запуск

### База данных
В корне проекта
> docker-compose up -d postgres 
При желании можно запустить pgadmin
> docker-compose up -d pgadmin 

### API сервис Форума
```bash
npm run dev
```

### Как это работает

**Фронтенд** отправляет на ручку login такие данные uuid, name получает токен, с этим токеном ходит на бек с Форум

## API Endpoints

### 🔒 Защищенные (требуют авторизации)
- `GET /api/v1/forum/auth/me` - Получить информацию о текущем пользователе
- `POST /api/v1/forum/auth/login` - Авторизация (получить JWT токен)
- `POST /api/v1/forum/auth/logout` - Выход (токен истекает естественным образом)
- `POST /api/v1/forum/topics` - Создать тему (можно указать `ownerId` для админов)
- `POST /api/v1/forum/topics/:id/comments` - Добавить комментарий к теме (можно указать `ownerId` для админов)
- `POST /api/v1/forum/comments/:id/replies` - Добавить ответ к комментарию
- `POST /api/v1/forum/replies/:id/reactions` - Добавить реакцию к ответу

### ℹ️ Информационные (без авторизации)
- `GET /api/v1/forum/auth/token-info` - Информация о настройках JWT токенов

## Модели данных

### Topic (Тема)
- `id` - уникальный идентификатор
- `title` - заголовок темы
- `body` - содержание темы
- `ownerId` - UID владельца (из JWT токена)
- `createdAt`, `updatedAt` - временные метки

### Comment (Комментарий)
- `id` - уникальный идентификатор
- `topicId` - ID темы
- `author` - имя автора
- `body` - содержание комментария
- `ownerId` - UID владельца (из OAuth)
- `createdAt`, `updatedAt` - временные метки

### Reply (Ответ)
- `id` - уникальный идентификатор
- `commentId` - ID комментария
- `author` - имя автора
- `body` - содержание ответа
- `ownerId` - UID владельца (из JWT токена)
- `createdAt`, `updatedAt` - временные метки

### Reaction (Реакция)
- `id` - уникальный идентификатор
- `replyId` - ID ответа
- `type` - тип реакции (like, dislike, laugh, sad, angry)
- `ownerId` - UID владельца (из JWT токена)
- `createdAt`, `updatedAt` - временные метки

## 🔍 Swagger документация

Откройте `http://localhost:3001/api-docs` для интерактивной документации API.

### 🔐 Swagger с JWT токенами

Теперь Swagger UI поддерживает работу с JWT токенами. Система использует Bearer токены для авторизации.

**Логика авторизации:**
- 🔑 **uid** - ID пользователя (обязательное поле)
- 👤 **name** - имя пользователя (обязательное поле)

## 🛡️ Безопасность

- **CORS** настроен для разрешенных доменов
- **JWT токены** с алгоритмом HS256 и сроком действия 24 часа
- **Валидация** всех входных данных
- **Автоматическое управление ownerId** - берется из JWT токена авторизованного пользователя

### Структура проекта
```
server/
├── api/v1/           # API роуты
│   ├── router.ts     # Главный роутер
│   ├── topics.ts     # Роуты для тем
│   ├── comments.ts   # Роуты для комментариев
│   └── auth.ts       # Роуты авторизации
├── forum/            # Бизнес-логика
│   ├── models.ts     # Sequelize модели
│   └── crud/         # CRUD операции
│       ├── topics.ts
│       └── comments.ts
├── middleware/       # Middleware
│   └── auth.ts       # Авторизация
├── public/           # Статические файлы
│   ├── test-auth.html # Тестовая страница для JWT API
│   └── swagger-custom.js # Кастомный JS для Swagger UI (JWT)
└── index.ts          # Главный файл сервера
```
