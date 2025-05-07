import React, { useMemo, useCallback } from 'react';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { createEditor, Descendant, Node } from 'slate';
import { withHistory } from 'slate-history';
import { css } from '@emotion/css';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './Toolbar';
import { ScribendiEditorProps } from '../types';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const ScribendijsEditor: React.FC<ScribendiEditorProps> = ({
  initialValue: externalInitialValue,
  onChange,
  readOnly = false,
  placeholder = 'Start typing...',
  className = '',
  style = {},
}) => {
  // Инициализация редактора Slate
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Определяем начальное значение контента
  const value = useMemo(
    () => (externalInitialValue && externalInitialValue.length > 0 ? externalInitialValue : initialValue),
    [externalInitialValue]
  );

  // Обработчик изменения содержимого редактора
  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  // Рендерер для элементов редактора
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);

  // Рендерер для форматированного текста
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  const editorStyles = css`
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    min-height: 200px;
    max-height: 100%;
    overflow-y: auto;
    
    .editable {
      padding: 16px;
      min-height: 200px;
      
      &:focus {
        outline: none;
      }
    }
  `;

  return (
    <div
      className={`${editorStyles} ${className}`}
      style={style}
    >
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        {!readOnly && <Toolbar editor={editor} />}
        <Editable
          className="editable"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck
        />
      </Slate>
    </div>
  );
}; 