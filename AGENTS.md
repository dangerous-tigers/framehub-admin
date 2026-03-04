# Framehub Admin — Руководство для разработчиков

## Обзор проекта

**Framehub Admin** — административная панель управления контентом на базе Next.js 16.1.6 с поддержкой GraphQL (Apollo Client), мультиязычной локализации и модульной архитектурой.

### Технологический стек

| Категория | Технология |
|-----------|------------|
| **Фреймворк** | Next.js 16.1.6 (App Router) |
| **Язык** | TypeScript 5.x (strict mode) |
| **UI Library** | React 19.2.3 |
| **Стили** | SCSS/Sass + CSS Modules |
| **State Management** | Apollo Client 4.1.4 (GraphQL) |
| **Интерnationalization** | next-intl 4.8.3 |
| **UI Kit** | @dangerous-tigers/framehub-ui-kit 1.0.0 |
| **Package Manager** | pnpm |

---

## Быстрый старт

### Установка зависимостей
```bash
pnpm install
```

### Запуск разработки
```bash
pnpm dev
# или pnpm run dev
```
Откройте [http://localhost:3000](http://localhost:3000)

### Сборка для продакшна
```bash
pnpm build      # Сборка проекта
pnpm start      # Запуск продакшн-сервера
```

### Code Quality
```bash
pnpm lint       # Запуск ESLint
```

### GraphQL Codegen
```bash
pnpm codegen    # Генерация TypeScript-типов из GraphQL схемы
```
- **Schema:** `https://inctagram.work/api/v1/graphql`
- **Preset:** near-operation-file для ко-локализованных типов

### Работа с иконками
```bash
pnpm generate-icons   # Конвертация SVG в React-компоненты
pnpm rename-icons     # Переименование иконок
```

---

## Структура проекта

```
framehub-admin/
├── app/                    # Next.js App Router
│   ├── (private)/          # Приватные роуты
│   ├── provider/           # Провайдеры (Apollo, i18n)
│   ├── ui/                 # UI компоненты уровня приложения
│   ├── layout.tsx          # Корневой layout
│   ├── page.tsx            # Главная страница
│   └── globals.css         # Глобальные стили
├── assets/                 # Статические ресурсы
│   └── icons/              # Иконки (svg + components)
├── messages/               # i18n переводы
│   ├── be.json             # Белорусский
│   ├── en.json             # Английский
│   ├── ru.json             # Русский
│   └── uk.json             # Украинский
├── queries/                # GraphQL запросы
│   ├── login.ts            # Исходный запрос
│   └── login.generated.ts  # Сгенерированные типы
├── public/                 # Публичные файлы
├── scripts/                # Build/utility скрипты
├── shared/                 # Общие модули
│   ├── config/             # Конфигурация приложения
│   ├── lib/                # Утилиты и хелперы
│   └── styles/             # Глобальные SCSS стили
├── types/                  # TypeScript типы
│   └── __generated__/      # GraphQL типы
└── widgets/                # Feature-based компоненты
    ├── header/             # Хедер
    └── sidebar/            # Сайдбар
```

### Описание директорий

| Директория | Назначение |
|------------|------------|
| `app/` | Next.js приложение с App Router структурой |
| `assets/icons/` | Иконки в формате SVG и сгенерированные React-компоненты |
| `messages/` | Файлы локализации для 4 языков |
| `queries/` | GraphQL запросы с co-located типами |
| `shared/` | Переиспользуемая логика, утилиты, конфиги |
| `widgets/` | Крупные UI-компоненты (header, sidebar) |

---

## Соглашения о коде

### TypeScript

- **Строгая типизация:** `strict: true` в `tsconfig.json`
- **Без `any`:** используйте конкретные типы или `unknown`
- **Импорт типов:** `import type { ... }` для типов

### Code Style

| Правило | Значение |
|---------|----------|
| **Кавычки** | Двойные (`"`) |
| **Точка с запятой** | Требуется |
| **Длина строки** | 120 символов максимум |
| **Trailing commas** | Всегда для multiline |
| **Расширения файлов** | `.ts`, `.tsx`, `.mts` |

### Порядок импортов (eslint-plugin-simple-import-sort)

```
1. Node.js built-ins    → node:fs, node:path
2. React, Next, пакеты  → react, next, lodash
3.Алиасы (@/)           → @/shared, @/widgets
4. Тильда импорты       → ~/config
5. Относительные        → ../, ./
6. Стили                → .scss, .css
7. Side-effect          → полифилы
```

### Пример правильного кода

```tsx
"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "@/widgets/header/ui";
import { LOGIN_QUERY } from "@/queries/login";

import styles from "./Component.module.scss";

interface Props {
  title: string;
  onClick: () => void;
}

export function Component({ title, onClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(LOGIN_QUERY);

  return (
    <div className={styles.container}>
      <Button onClick={onClick}>{title}</Button>
    </div>
  );
}
```

### Именование

| Элемент | Стиль | Пример |
|---------|-------|--------|
| **Компоненты** | PascalCase | `Header.tsx`, `Sidebar.tsx` |
| **Утилиты** | camelCase | `utils.ts`, `helpers.ts` |
| **Функции** | camelCase | `getData()`, `handleClick()` |
| **Интерфейсы/Типы** | PascalCase | `Props`, `ApiResponse` |
| **SCSS файлы** | kebab-case | `header-styles.scss` |
| **Генерируемые файлы** | `*.generated.ts` | `login.generated.ts` |
| **Скрипты** | kebab-case | `rename-icons.cjs` |

### Path Aliases

```json
{
  "@/*": "./*"
}
```

```tsx
// Правильно
import { config } from "@/shared/config";
import { Header } from "@/widgets/header";
```

### Best Practices

- ✅ Используйте `"use client"` для клиентских компонентов
- ✅ Строгий TypeScript режим включён
- ✅ Префикс `_` для неиспользуемых переменных: `const _unused = 1`
- ❌ Без `console.log` и `debugger` в продакшн-коде
- ❌ Без unused imports (проверяется ESLint)

---

## Ключевые конфигурационные файлы

| Файл | Назначение |
|------|------------|
| `next.config.ts` | Next.js настройки (image domains, strict mode) |
| `tsconfig.json` | TypeScript компилятор + path aliases |
| `codegen.ts` | GraphQL Code Generator конфигурация |
| `eslint.config.mts` | ESLint правила и плагины |
| `pnpm-workspace.yaml` | pnpm workspace настройки |

---

## API Интеграция

### GraphQL

- **Endpoint:** `https://inctagram.work/api/v1/graphql`
- **Клиент:** Apollo Client 4.x
- **Типы:** Генерируются автоматически через `pnpm codegen`

### Изображения

Разрешённые домены для `next/image`:
- `staging-it-incubator.s3.eu-central-1.amazonaws.com`

---

## Интернационализация (i18n)

Поддерживаемые языки в `messages/`:

| Код | Язык |
|-----|------|
| `be` | Белорусский |
| `en` | Английский |
| `ru` | Русский |
| `uk` | Украинский |

### Добавление новых фраз

1. Откройте соответствующий файл в `messages/`
2. Добавьте ключ-значение
3. Используйте в коде через хук `useTranslations`

---

## Архитектурные принципы

- **Atomic Design:** Компоненты организованы по принципу виджетов
- **Feature-based:** Код группируется по функциональности
- **Co-location:** GraphQL запросы и типы находятся рядом
- **Модульность:** `shared/` для общего, `widgets/` для UI

---

## Примечания для разработчиков

1. **Перед коммитом:** Убедитесь, что `pnpm lint` проходит без ошибок
2. **После изменений GraphQL:** Запустите `pnpm codegen` для обновления типов
3. **Новые компоненты:** Добавляйте в соответствующий `widgets/` модуль
4. **Переводы:** Все пользовательские строки добавляйте в `messages/`
5. **Документация:** Обновляйте этот файл при изменении рабочих процессов

---

*Документ создан для ИИ-агентов и разработчиков, работающих с Framehub Admin*
