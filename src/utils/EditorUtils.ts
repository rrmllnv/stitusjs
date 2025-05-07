import { 
  EditorContent, 
  TextNode, 
  EditorElement, 
  EditorNode,
  ElementType,
  SelectionState,
  TextFormat
} from '../types';

/**
 * Создает пустой документ
 */
export const createEmptyDocument = (): EditorContent => {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ];
};

/**
 * Проверяет, является ли узел текстовым
 */
export const isTextNode = (node: TextNode | EditorElement): node is TextNode => {
  return 'text' in node;
};

/**
 * Создает нового текстовый узел
 */
export const createTextNode = (text: string, formats: Partial<Record<TextFormat, boolean>> = {}): TextNode => {
  return {
    text,
    ...formats
  };
};

/**
 * Создает новый элемент
 */
export const createElement = (type: ElementType, children: (TextNode | EditorElement)[] = []): EditorElement => {
  return {
    type,
    children: children.length ? children : [createTextNode('')]
  };
};

/**
 * Получает путь к узлу в документе по индексам
 */
export const getNodeAtPath = (content: EditorContent, path: number[]): TextNode | EditorElement | undefined => {
  if (path.length === 0 || path[0] >= content.length) return undefined;
  
  let current: EditorElement = content[path[0]];
  
  for (let i = 1; i < path.length; i++) {
    if (!('children' in current)) return undefined;
    
    const index = path[i];
    if (index >= current.children.length) return undefined;
    
    current = current.children[index] as EditorElement;
  }
  
  return current;
};

/**
 * Вставляет текстовый узел по пути
 */
export const insertNodeAtPath = (
  content: EditorContent,
  path: number[],
  node: TextNode | EditorElement
): EditorContent => {
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  
  if (path.length === 1) {
    result.splice(path[0], 0, node as EditorElement);
    return result;
  }
  
  const parentPath = path.slice(0, -1);
  const parentNode = getNodeAtPath(result, parentPath);
  
  if (!parentNode || isTextNode(parentNode)) return result;
  
  const index = path[path.length - 1];
  parentNode.children.splice(index, 0, node);
  
  return result;
};

/**
 * Удаляет узел по пути
 */
export const removeNodeAtPath = (
  content: EditorContent,
  path: number[]
): EditorContent => {
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  
  if (path.length === 1) {
    if (result.length === 1) {
      return [createElement('paragraph')];
    }
    result.splice(path[0], 1);
    return result;
  }
  
  const parentPath = path.slice(0, -1);
  const parentNode = getNodeAtPath(result, parentPath);
  
  if (!parentNode || isTextNode(parentNode)) return result;
  
  const index = path[path.length - 1];
  parentNode.children.splice(index, 1);
  
  // Если после удаления не осталось дочерних элементов, добавляем пустой текстовый узел
  if (parentNode.children.length === 0) {
    parentNode.children.push(createTextNode(''));
  }
  
  return result;
};

/**
 * Обновляет узел по пути
 */
export const updateNodeAtPath = (
  content: EditorContent,
  path: number[],
  update: Partial<TextNode | EditorElement>
): EditorContent => {
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  const node = getNodeAtPath(result, path);
  
  if (!node) return result;
  
  Object.assign(node, update);
  
  return result;
};

/**
 * Применяет форматирование к выделенному тексту
 */
export const applyTextFormat = (
  content: EditorContent,
  selection: SelectionState,
  format: TextFormat,
  value = true
): EditorContent => {
  if (selection.isCollapsed) return content;
  
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  
  // Упрощенная реализация для демонстрации
  // В реальном редакторе нужно обрабатывать все узлы в выделении
  const startNode = getNodeAtPath(result, selection.startNode);
  
  if (startNode && isTextNode(startNode)) {
    startNode[format] = value;
  }
  
  return result;
};

/**
 * Преобразует элемент в другой тип
 */
export const transformElement = (
  content: EditorContent,
  path: number[],
  newType: ElementType
): EditorContent => {
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  const node = getNodeAtPath(result, path);
  
  if (!node || isTextNode(node)) return result;
  
  node.type = newType;
  
  return result;
};

/**
 * Вставляет текст в указанную позицию
 */
export const insertText = (
  content: EditorContent,
  path: number[],
  offset: number,
  text: string
): EditorContent => {
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  const node = getNodeAtPath(result, path);
  
  if (!node || !isTextNode(node)) return result;
  
  const beforeText = node.text.substring(0, offset);
  const afterText = node.text.substring(offset);
  node.text = beforeText + text + afterText;
  
  return result;
};

/**
 * Удаляет текст в указанном диапазоне
 */
export const deleteText = (
  content: EditorContent,
  path: number[],
  startOffset: number,
  endOffset: number
): EditorContent => {
  const result = JSON.parse(JSON.stringify(content)) as EditorContent;
  const node = getNodeAtPath(result, path);
  
  if (!node || !isTextNode(node)) return result;
  
  const beforeText = node.text.substring(0, startOffset);
  const afterText = node.text.substring(endOffset);
  node.text = beforeText + afterText;
  
  return result;
}; 