import ScribendijsEditor from './components/ScribendijsEditor';
import Element from './components/Element';
import Leaf from './components/Leaf';
import Toolbar from './components/Toolbar';

import { 
  createEmptyDocument,
  isTextNode,
  createTextNode,
  createElement,
  getNodeAtPath,
  insertNodeAtPath,
  removeNodeAtPath,
  updateNodeAtPath,
  applyTextFormat,
  transformElement,
  insertText,
  deleteText
} from './utils/EditorUtils';

import type {
  TextFormat,
  TextAlignment,
  ElementType,
  TextNode,
  BaseElement,
  ImageElement,
  TableElement,
  TableRowElement,
  TableCellElement,
  EditorElement,
  EditorContent,
  EditorConfig,
  SelectionState,
  ScribendijsEditorProps
} from './types';

// Экспорт компонентов
export {
  ScribendijsEditor,
  Element,
  Leaf,
  Toolbar
};

// Экспорт утилит
export {
  createEmptyDocument,
  isTextNode,
  createTextNode,
  createElement,
  getNodeAtPath,
  insertNodeAtPath,
  removeNodeAtPath,
  updateNodeAtPath,
  applyTextFormat,
  transformElement,
  insertText,
  deleteText
};

// Экспорт типов
export type {
  TextFormat,
  TextAlignment,
  ElementType,
  TextNode,
  BaseElement,
  ImageElement,
  TableElement,
  TableRowElement,
  TableCellElement,
  EditorElement,
  EditorContent,
  EditorConfig,
  SelectionState,
  ScribendijsEditorProps
};

// Экспорт по умолчанию
export default ScribendijsEditor; 