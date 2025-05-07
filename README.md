# Scribendijs

Легкий и гибкий текстовый редактор для React-приложений, созданный с нуля без зависимостей от других редакторов.

## Особенности

- Чистая реализация на React и TypeScript
- Форматирование текста (жирный, курсив, подчеркнутый, зачеркнутый, код)
- Различные типы блоков (заголовки, списки, цитаты, блоки кода)
- Выравнивание текста (по левому краю, по центру, по правому краю)
- Поддержка таблиц и изображений
- Режим только для чтения
- Настраиваемый интерфейс
- Минимальные зависимости

## Установка

```bash
npm install scribendijs
```

или

```bash
yarn add scribendijs
```

## Использование

### Базовый пример

```jsx
import React, { useState } from 'react';
import { ScribendijsEditor, createEmptyDocument } from 'scribendijs';

const App = () => {
  const [content, setContent] = useState(createEmptyDocument());

  return (
    <div>
      <h1>Scribendijs Editor</h1>
      <ScribendijsEditor
        value={content}
        onChange={setContent}
      />
    </div>
  );
};

export default App;
```

### Конфигурация

```jsx
import React, { useState } from 'react';
import { ScribendijsEditor, createEmptyDocument } from 'scribendijs';

const App = () => {
  const [content, setContent] = useState(createEmptyDocument());

  return (
    <div>
      <h1>Scribendijs Editor с настройками</h1>
      <ScribendijsEditor
        value={content}
        onChange={setContent}
        config={{
          readOnly: false,
          placeholder: 'Начните печатать...',
          enabledFeatures: {
            bold: true,
            italic: true,
            underline: true,
            strikethrough: true,
            heading: true,
            list: true,
            blockquote: true,
            codeBlock: true,
            image: true,
            table: true,
            alignment: true
          }
        }}
      />
    </div>
  );
};

export default App;
```

## Структура данных

Scribendijs использует простую структуру данных для представления контента, что облегчает сериализацию и десериализацию:

```typescript
// Пример структуры данных
const content = [
  {
    type: 'heading-one',
    children: [{ text: 'Заголовок документа' }]
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Обычный текст ' },
      { text: 'жирный текст', bold: true },
      { text: ' и ' },
      { text: 'курсив', italic: true }
    ]
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [{ text: 'Элемент списка 1' }]
      },
      {
        type: 'list-item',
        children: [{ text: 'Элемент списка 2' }]
      }
    ]
  }
]
```

## API

### Компоненты

- `ScribendijsEditor` - Основной компонент редактора
- `Element` - Компонент для отображения элементов
- `Leaf` - Компонент для отображения текста
- `Toolbar` - Панель инструментов

### Утилиты

- `createEmptyDocument()` - Создает пустой документ
- `createElement(type, children)` - Создает новый элемент
- `createTextNode(text, formats)` - Создает новый текстовый узел
- `applyTextFormat(content, selection, format, value)` - Применяет форматирование к выделенному тексту
- `transformElement(content, path, newType)` - Преобразует элемент в другой тип
- и другие утилиты для работы с документом

## Лицензия

MIT 