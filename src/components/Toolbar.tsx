import React from 'react';
import { css } from '@emotion/css';
import { 
  TextFormat, 
  ElementType, 
  TextAlignment, 
  EditorContent, 
  SelectionState 
} from '../types';

interface ToolbarProps {
  value: EditorContent;
  selection: SelectionState | null;
  onFormatText: (format: TextFormat) => void;
  onFormatBlock: (type: ElementType) => void;
  onAlignText: (alignment: TextAlignment) => void;
  onInsertTable: () => void;
  onInsertImage: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  value,
  selection,
  onFormatText,
  onFormatBlock,
  onAlignText,
  onInsertTable,
  onInsertImage
}) => {
  const toolbarStyles = css`
    position: relative;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #f5f5f5;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  `;

  const buttonStyles = css`
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    
    &:hover {
      background-color: #e0e0e0;
    }
    
    &.active {
      background-color: #ddd;
    }
  `;

  const dividerStyles = css`
    width: 1px;
    background-color: #ddd;
    margin: 0 5px;
    align-self: stretch;
  `;

  const dropdownStyles = css`
    position: relative;
    display: inline-block;
    
    .dropdown-content {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #fff;
      min-width: 160px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1;
      border-radius: 3px;
      overflow: hidden;
    }
    
    &:hover .dropdown-content {
      display: block;
    }
    
    .dropdown-item {
      padding: 8px 10px;
      cursor: pointer;
      
      &:hover {
        background-color: #f1f1f1;
      }
    }
  `;

  // Сделаем кнопки форматирования текста
  return (
    <div className={toolbarStyles}>
      <button 
        className={buttonStyles} 
        onClick={() => onFormatText('bold')}
        title="Bold"
      >
        B
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onFormatText('italic')}
        title="Italic"
      >
        I
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onFormatText('underline')}
        title="Underline"
      >
        U
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onFormatText('strikethrough')}
        title="Strikethrough"
      >
        S
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onFormatText('code')}
        title="Code"
      >
        &lt;/&gt;
      </button>
      
      <div className={dividerStyles} />
      
      <div className={dropdownStyles}>
        <button className={buttonStyles} title="Heading">
          Heading
        </button>
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={() => onFormatBlock('paragraph')}>
            Paragraph
          </div>
          <div className="dropdown-item" onClick={() => onFormatBlock('heading-one')}>
            Heading 1
          </div>
          <div className="dropdown-item" onClick={() => onFormatBlock('heading-two')}>
            Heading 2
          </div>
          <div className="dropdown-item" onClick={() => onFormatBlock('heading-three')}>
            Heading 3
          </div>
        </div>
      </div>
      
      <div className={dropdownStyles}>
        <button className={buttonStyles} title="List">
          List
        </button>
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={() => onFormatBlock('bulleted-list')}>
            Bulleted List
          </div>
          <div className="dropdown-item" onClick={() => onFormatBlock('numbered-list')}>
            Numbered List
          </div>
        </div>
      </div>
      
      <button 
        className={buttonStyles} 
        onClick={() => onFormatBlock('blockquote')}
        title="Blockquote"
      >
        Quote
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onFormatBlock('code-block')}
        title="Code Block"
      >
        Code Block
      </button>
      
      <div className={dividerStyles} />
      
      <button 
        className={buttonStyles} 
        onClick={() => onAlignText('left')}
        title="Align Left"
      >
        Left
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onAlignText('center')}
        title="Align Center"
      >
        Center
      </button>
      <button 
        className={buttonStyles} 
        onClick={() => onAlignText('right')}
        title="Align Right"
      >
        Right
      </button>
      
      <div className={dividerStyles} />
      
      <button 
        className={buttonStyles} 
        onClick={onInsertTable}
        title="Insert Table"
      >
        Table
      </button>
      <button 
        className={buttonStyles} 
        onClick={onInsertImage}
        title="Insert Image"
      >
        Image
      </button>
    </div>
  );
};

export default Toolbar; 