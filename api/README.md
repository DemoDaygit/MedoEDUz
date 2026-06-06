# MedoEDUz API Documentation

## Обзор

API для платформы MedoEDUz предоставляет endpoints для управления курсами, пользователями, регистрациями и другими функциями платформы.

**Base URL**: `https://api.medoeduz.com/v1`

**Аутентификация**: JWT Bearer Token

## Endpoints

### Аутентификация

#### POST /auth/register
Регистрация нового пользователя

**Request:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "password": "securePassword123",
  "phone": "+79991234567"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

#### POST /auth/login
Вход пользователя

**Request:**
```json
{
  "email": "ivan@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": "user_123",
      "name": "Иван Иванов",
      "email": "ivan@example.com"
    }
  }
}
```

### Курсы

#### GET /courses
Получить список всех курсов

**Query Parameters:**
- `category` (optional): фильтр по категории
- `level` (optional): фильтр по уровню (beginner, intermediate, advanced)
- `limit` (optional, default: 20): количество результатов
- `offset` (optional, default: 0): смещение для пагинации

**Response (200):**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "course_1",
        "title": "ИИ для контент-мейкеров",
        "slug": "ai-for-content-makers",
        "description": "Создание контента с помощью ИИ",
        "category": "content",
        "level": "beginner",
        "duration": "6 недель",
        "price": 15000,
        "currency": "RUB",
        "instructor": {
          "id": "instructor_1",
          "name": "Анна Петрова",
          "avatar": "https://..."
        },
        "thumbnail": "https://...",
        "rating": 4.8,
        "studentsCount": 342,
        "features": [
          "Генерация текстов",
          "Создание изображений",
          "Автоматизация"
        ]
      }
    ],
    "total": 15,
    "limit": 20,
    "offset": 0
  }
}
```

#### GET /courses/:id
Получить детальную информацию о курсе

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "course_1",
    "title": "ИИ для контент-мейкеров",
    "slug": "ai-for-content-makers",
    "description": "Полное описание курса...",
    "longDescription": "Подробное описание...",
    "category": "content",
    "level": "beginner",
    "duration": "6 недель",
    "price": 15000,
    "currency": "RUB",
    "syllabus": [
      {
        "week": 1,
        "title": "Введение в ИИ",
        "topics": ["ChatGPT", "Prompting"],
        "duration": "2 часа"
      }
    ],
    "requirements": [
      "Базовые компьютерные навыки",
      "Желание учиться"
    ],
    "whatYouWillLearn": [
      "Работа с ChatGPT",
      "Создание промптов",
      "Генерация изображений"
    ],
    "instructor": {
      "id": "instructor_1",
      "name": "Анна Петрова",
      "bio": "Эксперт в области ИИ...",
      "avatar": "https://...",
      "rating": 4.9,
      "coursesCount": 5
    }
  }
}
```

### Регистрация на курс

#### POST /enrollments
Записаться на курс

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "courseId": "course_1",
  "paymentMethod": "card",
  "promoCode": "MEDOED2024"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "enrollmentId": "enrollment_123",
    "courseId": "course_1",
    "userId": "user_123",
    "status": "pending_payment",
    "paymentUrl": "https://payment.medoeduz.com/...",
    "expiresAt": "2024-11-20T12:00:00Z"
  }
}
```

#### GET /enrollments/my
Получить мои курсы

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "enrollments": [
      {
        "id": "enrollment_123",
        "course": {
          "id": "course_1",
          "title": "ИИ для контент-мейкеров",
          "thumbnail": "https://..."
        },
        "progress": 45,
        "status": "active",
        "enrolledAt": "2024-11-01T10:00:00Z",
        "completedLessons": 12,
        "totalLessons": 24
      }
    ]
  }
}
```

### Контактная форма

#### POST /contact
Отправить сообщение через контактную форму

**Request:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+79991234567",
  "course": "ai-for-developers",
  "message": "Хочу узнать подробности о курсе"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Спасибо! Мы свяжемся с вами в ближайшее время."
}
```

### Отзывы

#### GET /testimonials
Получить отзывы

**Query Parameters:**
- `courseId` (optional): фильтр по курсу
- `limit` (optional, default: 10)
- `offset` (optional, default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "id": "testimonial_1",
        "author": {
          "name": "Алексей Смирнов",
          "avatar": "https://...",
          "role": "Контент-менеджер"
        },
        "course": {
          "id": "course_1",
          "title": "ИИ для контент-мейкеров"
        },
        "rating": 5,
        "text": "Отличный курс!",
        "createdAt": "2024-10-15T10:00:00Z"
      }
    ],
    "total": 142
  }
}
```

#### POST /testimonials
Добавить отзыв (требуется аутентификация и завершение курса)

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "courseId": "course_1",
  "rating": 5,
  "text": "Отличный курс, многому научился!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "testimonial_123",
    "status": "pending_moderation"
  }
}
```

### Пользователь

#### GET /users/me
Получить профиль текущего пользователя

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "phone": "+79991234567",
    "avatar": "https://...",
    "createdAt": "2024-01-15T10:00:00Z",
    "stats": {
      "coursesCompleted": 3,
      "coursesInProgress": 2,
      "certificatesEarned": 3
    }
  }
}
```

#### PATCH /users/me
Обновить профиль

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "name": "Иван Петрович Иванов",
  "phone": "+79991234567",
  "avatar": "https://..."
}
```

## Коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `422` - Ошибка валидации
- `429` - Слишком много запросов
- `500` - Внутренняя ошибка сервера

## Формат ошибок

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Неверный формат email",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

## Rate Limiting

- 100 запросов в минуту для неавторизованных пользователей
- 500 запросов в минуту для авторизованных пользователей
- 1000 запросов в минуту для premium пользователей

## Webhooks

### payment.success
Вызывается при успешной оплате

```json
{
  "event": "payment.success",
  "data": {
    "enrollmentId": "enrollment_123",
    "amount": 15000,
    "currency": "RUB",
    "timestamp": "2024-11-18T12:00:00Z"
  }
}
```

## Версионирование

API использует версионирование через URL. Текущая версия: `v1`

При выходе новой версии старая будет поддерживаться минимум 6 месяцев.
