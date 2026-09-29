# Портфолио — Кондратьева Елизавета

Адаптивный сайт-портфолио на **Next.js 15 (App Router) + TypeScript + SCSS (БЭМ)**,
свёрстанный по Figma-файлу `portfolio`: главная (фреймы 393 / 703 / 768 / 1280 / 1440 / 1920),
страница кейса (393 / 768 / 1280 / 1440 / 1920) и ui-kit.

## Запуск

Нужны Node.js 18.18+ (лучше 20 LTS или новее) и Yarn 1 (версия зафиксирована в `package.json` → `packageManager`).

Если команды `yarn` нет, её можно не ставить глобально — Node.js умеет запускать нужную версию сам:

```bash
corepack yarn install
```

Либо один раз включить `yarn` как обычную команду (может понадобиться пароль администратора):

```bash
corepack enable
```

Команды:

```bash
yarn install      # установить зависимости
yarn dev          # режим разработки → http://localhost:3000
yarn build        # production-сборка
yarn start        # запустить собранную версию
yarn typecheck    # проверка типов TypeScript
```

Используйте только Yarn: `package-lock.json` (npm) в проекте быть не должно, иначе Next.js
предупреждает о нескольких lock-файлах.

## Структура

```
src/
  app/                    роутинг Next.js — только тонкие обёртки над views
    layout.tsx            <html>, шрифты, глобальные стили
    fonts.ts              Geist / Geist Mono (пакет geist) и Inter (next/font)
    page.tsx              /  → views/home-page
    projects/[slug]/      /projects/<id> → views/case-page (генерируются только заполненные кейсы)
  views/                  страницы целиком (не `pages/` — так Next.js называет старый роутер)
    home-page/
    case-page/
  components/
    ui/                   дизайн-система: примитивы typography, icon и компоненты ui-kit из Figma —
                          button, tag, section-heading, project-card, profile-card, skill-group (аккордеон),
                          skill-list, task-card, case-introduction, graduation-photo, cropped-image
    layout/               header (меню + мобильное меню), footer
    sections/
      home/               hero, skills, projects, career (опыт / образование / качества)
      case/               case-context, case-tasks, case-screens, case-nav
  constants/              весь контент: тексты, контакты, навигация, проекты, кейсы
    cases/                по файлу на кейс + реестр CASES в index.ts
  types/                  TypeScript-типы контента и дизайн-системы (TextVariant, ColorToken, Responsive)
  utils/                  cn (склейка классов), ссылки, форматирование, getNextProject, responsiveModifiers
  styles/
    abstracts/            только переменные и миксины: брейкпоинты, цвета, текстовые стили, хелперы
    base/                 токены (CSS-переменные из Figma), reset, утилиты
    main.scss             глобальная точка входа (подключается в app/layout.tsx)
public/
  images/, icons/         ассеты, выгруженные из Figma
```

## Дизайн-система

### Typography

Любой текст — через `<Typography>`, стили берутся из текстовых стилей Figma:

```tsx
import { Typography } from "@/components/ui";

<Typography variant="t2b" color="grey-8">Навыки</Typography>

// тег по умолчанию берётся из варианта (h1 → <h1>, t2 → <p>), можно задать свой — хоть next/link
<Typography as="span" variant="tag" color="blue-400">Роль</Typography>
<Typography as={Link} href="/#projects" variant="t3b">← Все проекты</Typography>

// вариант может меняться по брейкпоинтам (mobile-first)
<Typography as="h1" variant={{ base: "h2", lg: "h1" }} color="grey-8">SellSaver</Typography>
```

| Проп | Значения |
|------|----------|
| `variant` | `h1` `h2` `h3` `h-accent` `t1` `t1b` `t2` `t2b` `t3` `t3b` `t4` `tag` — или `{ base, sm, md, lg, xl, xxl }` |
| `color` | токены Figma: `grey-0` … `grey-8`, `blue-50` … `blue-900`, `blue-mist` (без пропа цвет наследуется) |
| `as` | любой тег или компонент |
| `align` | `left` `center` `right` |
| `nowrap` | запрет переноса строк |

Стили хранятся в одном месте — карта `$text-styles` в `styles/abstracts/_typography.scss`.
Из неё генерируются модификаторы `.typography--t2b`, `.typography--lg-h1`, `.typography--color-grey-8`,
и она же доступна в SCSS миксином `@include text-style(t2b)` (или короче `@include t2b`).
Чтобы добавить стиль или поменять существующий, достаточно поправить карту и тип `TextVariant`.

### Icon

```tsx
<Icon name="telegram" tone="light" />
```

В Figma у каждой иконки свой SVG на каждый цвет, поэтому тон выбирается из доступных для иконки
(TypeScript подскажет варианты). Кнопка принимает иконку элементом:
`<Button icon={<Icon name="telegram" tone="muted" />}>Связаться</Button>`.

### Соглашения

- **Имена файлов и папок — kebab-case**: `project-card/project-card.tsx`, `project-card.scss`, `index.ts`.
  Имя файла совпадает с БЭМ-блоком: `project-card.tsx` → `.project-card`.
  Имена самих React-компонентов в коде — с заглавной (`ProjectCard`), иначе JSX примет их за HTML-теги.
  Исключения задаёт Next.js: `page.tsx`, `layout.tsx`, `[slug]`.
- **Компонент = папка**: разметка, стили и `index.ts` для реэкспорта лежат вместе.
  Импортируйте через папку или barrel: `import { Button } from "@/components/ui"`.
- **Стили — SCSS + БЭМ**: `.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`.
  Имя блока в kebab-case совпадает с компонентом: `ProjectCard` → `.project-card`.
  Внешние отступы и позиционирование компонента задаёт родитель через mix-класс
  (`<ProfileCard className="hero__card" />`).
- **Каждый .scss начинается с** `@use "abstracts" as *;` — путь к `src/styles` настроен в `next.config.ts`.
  Брейкпоинты: `@include mq(sm | md | lg | xl | xxl) { … }` (600 / 768 / 1280 / 1440 / 1920, mobile-first).
  В `.scss` компонента — только раскладка и то, чего нет в дизайн-системе; текст оформляется через `<Typography>`.
  Отступления от текстовых стилей Figma (например, Inter 13/20.8 в карточке проекта) помечены комментарием.
- **Цвета и тени** — только через токены `var(--blue-700)`, `var(--grey-5)`, `var(--shadow-11)` (`styles/base/_tokens.scss`).
- **Контент** не пишется в компонентах — только в `src/constants`.

## Брейкпоинты главной

| Ширина     | Макет         | Что меняется |
|------------|---------------|--------------|
| < 600      | Mobile 393    | Бургер, аккордеон навыков, карточки в колонку |
| 600–767    | Tablet 703    | Имя 80px рядом с фото, проекты в 2 колонки |
| 768–1279   | Tablet 768    | Кнопка «Связаться» в шапке, отступы 32px |
| 1280–1439  | Netbook 1280  | Полное меню, первый экран в 3 колонки, навыки колонками |
| 1440–1919  | Desktop 1440  | Фото поднимается на строку с именем, проекты сеткой 2×N |
| ≥ 1920     | Full HD 1920  | Поля 128px, увеличенная карточка профиля, «плоский» таймлайн |

## Как добавить кейс

Шаблон — `src/views/case-page`, пример — `/projects/sellsaver`.

1. Создайте `src/constants/cases/smart.ts` по образцу `sellsaver.ts` и добавьте его в `CASES`
   в `src/constants/cases/index.ts` с ключом, равным `id` проекта (`smart`).
2. Положите картинки в `public/images/cases/smart/`.
3. В `src/constants/projects.ts` поменяйте у проекта `href` на `ROUTES.project("smart")`.

Кнопка «следующий проект» внизу кейса берёт следующий проект из `PROJECTS`.

Необязательные поля кейса (см. `src/types/case.ts`, пример — `smart.ts`):

- `headings` — свои заголовки секций вместо «Как работала над проектом» / «Конкретные задачи»;
- `scope` — блок «Объём реализации» со списком под шагами подхода;
- `screens` — галерея «Экраны и прототипы»; если её нет (проект под NDA), секция не выводится.

Абзац `goal.context` собирается из частей: `accent: true` — тёмным, остальное — серым.

## Что проверить / дополнить

- `CONTACTS.behance.href` в `src/constants/person.ts` — в макете нет ссылки на профиль Behance.
- Ссылки «Смотреть →» у проектов без кейса ведут на `#`.
- Чипсы на картинке при наведении (Web / Mobile / Desktop) в макете есть только у SellSaver;
  для остальных проектов их можно добавить в поле `tags`.
- Картинки из Figma тяжёлые (обложки до 15 МБ) — Next.js ужимает их при показе, но исходники лучше пережать.
