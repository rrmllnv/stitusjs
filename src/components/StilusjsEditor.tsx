import React, { useState, useRef, useCallback, useEffect } from 'react';
import { css } from '@emotion/css';
import { 
  StilusjsEditorProps, 
  EditorContent, 
  SelectionState, 
  TextFormat, 
  ElementType, 
  TextAlignment 
} from '../types';
import { 
  createEmptyDocument, 
  applyTextFormat, 
  transformElement, 
  updateNodeAtPath,
  insertText,
  deleteText
} from '../utils/EditorUtils';
import Toolbar from './Toolbar';
import Element from './Element';
import Leaf from './Leaf';

const StilusjsEditor: React.FC<StilusjsEditorProps> = ({
  value,
  onChange,
  config = {},
  className
}) => {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Стили для редактора
  const editorStyles = css`
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 10px 15px;
    min-height: 200px;
    outline: none;
    overflow-y: auto;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  `;

  // Рендерим каждый элемент рекурсивно
  const renderElement = (element: any, path: number[]) => {
    return (
      <Element element={element} key={path.join('-')}>
        {element.children.map((child: any, i: number) => {
          const childPath = [...path, i];
          return 'text' in child 
            ? renderLeaf(child, childPath) 
            : renderElement(child, childPath);
        })}
      </Element>
    );
  };

  // Рендерим текстовый узел
  const renderLeaf = (leaf: any, path: number[]) => {
    return (
      <Leaf leaf={leaf} key={path.join('-')}>
        {leaf.text || '\u200B'}
      </Leaf>
    );
  };
  
  // Обработчики для панели инструментов
  const handleFormatText = useCallback((format: TextFormat) => {
    if (!selection) return;
    const newValue = applyTextFormat(value, selection, format);
    onChange(newValue);
  }, [value, onChange, selection]);
  
  const handleFormatBlock = useCallback((type: ElementType) => {
    if (!selection) return;
    // Упрощенно: применяем форматирование только к первому элементу в выделении
    const newValue = transformElement(value, selection.startNode.slice(0, 1), type);
    onChange(newValue);
  }, [value, onChange, selection]);
  
  const handleAlignText = useCallback((alignment: TextAlignment) => {
    if (!selection) return;
    // Упрощенно: применяем выравнивание только к первому элементу в выделении
    const path = selection.startNode.slice(0, 1);
    const newValue = updateNodeAtPath(value, path, { align: alignment });
    onChange(newValue);
  }, [value, onChange, selection]);
  
  const handleInsertTable = useCallback(() => {
    // Здесь должна быть логика для вставки таблицы
    // Упрощенно в этой реализации
    console.log('Insert table');
  }, []);
  
  const handleInsertImage = useCallback(() => {
    // Здесь должна быть логика для вставки изображения
    // Упрощенно в этой реализации
    console.log('Insert image');
  }, []);

  // Обработчик для получения текущего выделения
  const handleSelectionChange = useCallback(() => {
    if (!editorRef.current) return;
    
    const domSelection = window.getSelection();
    if (!domSelection || domSelection.rangeCount === 0) return;
    
    // Здесь должна быть логика для преобразования DOM-выделения в наш формат SelectionState
    // Это упрощенная реализация
    setSelection({
      startNode: [0, 0],
      startOffset: 0,
      endNode: [0, 0],
      endOffset: 0,
      isCollapsed: true
    });
  }, []);
  
  // Добавляем прослушиватель событий выделения
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [handleSelectionChange]);
  
  // Предотвращаем стандартное поведение при нажатии клавиш для реализации наших обработчиков
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (config.readOnly) {
      e.preventDefault();
      return;
    }
    
    // Здесь должна быть логика для обработки нажатий клавиш
    // Например, Backspace, Delete, Enter и т.д.
  }, [config.readOnly]);

  // Обработчик для пасты текста
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    if (config.readOnly) {
      e.preventDefault();
      return;
    }
    
    // Здесь должна быть логика для вставки текста
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    if (!selection) return;
    
    // Упрощенно: просто вставляем текст в текущее выделение
    const newValue = insertText(value, selection.startNode, selection.startOffset, text);
    onChange(newValue);
  }, [config.readOnly, value, onChange, selection]);

  return (
    <div className={className}>
      {!config.readOnly && (
        <Toolbar
          value={value}
          selection={selection}
          onFormatText={handleFormatText}
          onFormatBlock={handleFormatBlock}
          onAlignText={handleAlignText}
          onInsertTable={handleInsertTable}
          onInsertImage={handleInsertImage}
        />
      )}
      <div
        ref={editorRef}
        className={editorStyles}
        contentEditable={!config.readOnly}
        suppressContentEditableWarning
        spellCheck
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      >
        {value.map((element, i) => renderElement(element, [i]))}
      </div>
    </div>
  );
};

export default StilusjsEditor; 