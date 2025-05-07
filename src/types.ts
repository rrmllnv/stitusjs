/**
 * Типы форматирования текста
 */
export type TextFormat = 
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'superscript'
  | 'subscript';

/**
 * Типы выравнивания текста
 */
export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

/**
 * Типы элементов
 */
export type ElementType = 
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'blockquote'
  | 'code-block'
  | 'bulleted-list'
  | 'numbered-list'
  | 'list-item'
  | 'image'
  | 'table'
  | 'table-row'
  | 'table-cell';

/**
 * Свойства текстового узла
 */
export interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  superscript?: boolean;
  subscript?: boolean;
}

// Интерфейс для EditorNode, который представляет любой узел в документе
export interface EditorNode {
  // Общий интерфейс для всех узлов
}

/**
 * Базовые свойства элемента
 */
export interface BaseElement extends EditorNode {
  type: ElementType;
  children: (TextNode | EditorNode)[];
  align?: TextAlignment;
}

/**
 * Свойства элемента изображения
 */
export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

/**
 * Свойства элемента таблицы
 */
export interface TableElement extends BaseElement {
  type: 'table';
}

/**
 * Свойства строки таблицы
 */
export interface TableRowElement extends BaseElement {
  type: 'table-row';
}

/**
 * Свойства ячейки таблицы
 */
export interface TableCellElement extends BaseElement {
  type: 'table-cell';
  header?: boolean;
}

/**
 * Объединенный тип элемента редактора
 */
export type EditorElement = 
  | BaseElement 
  | ImageElement 
  | TableElement 
  | TableRowElement 
  | TableCellElement;

/**
 * Содержимое редактора
 */
export type EditorContent = EditorElement[];

/**
 * Конфигурация редактора
 */
export interface EditorConfig {
  readOnly?: boolean;
  placeholder?: string;
  enabledFeatures?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    heading?: boolean;
    list?: boolean;
    blockquote?: boolean;
    codeBlock?: boolean;
    image?: boolean;
    table?: boolean;
    alignment?: boolean;
  }
}

/**
 * Информация о выделении текста
 */
export interface SelectionState {
  startNode: number[];
  startOffset: number;
  endNode: number[];
  endOffset: number;
  isCollapsed: boolean;
}

/**
 * Свойства компонента редактора
 */
export interface StilusjsEditorProps {
  value: EditorContent;
  onChange: (value: EditorContent) => void;
  config?: EditorConfig;
  className?: string;
} 