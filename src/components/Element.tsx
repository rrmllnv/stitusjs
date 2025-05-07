import React from 'react';
import { EditorElement, EditorNode, ImageElement, TableCellElement, BaseElement } from '../types';
import { css } from '@emotion/css';

interface ElementProps {
  element: EditorElement;
  children: React.ReactNode;
}

const Element: React.FC<ElementProps> = ({ element, children }) => {
  const baseElement = element as BaseElement;
  const style = baseElement.align 
    ? { textAlign: baseElement.align } 
    : {};
    
  switch (element.type) {
    case 'paragraph':
      return <p style={style} className={css`margin: 0 0 1em 0;`}>{children}</p>;
      
    case 'heading-one':
      return <h1 style={style} className={css`margin: 1em 0 0.5em 0;`}>{children}</h1>;
      
    case 'heading-two':
      return <h2 style={style} className={css`margin: 1em 0 0.5em 0;`}>{children}</h2>;
      
    case 'heading-three':
      return <h3 style={style} className={css`margin: 1em 0 0.5em 0;`}>{children}</h3>;
      
    case 'heading-four':
      return <h4 style={style} className={css`margin: 1em 0 0.5em 0;`}>{children}</h4>;
      
    case 'heading-five':
      return <h5 style={style} className={css`margin: 1em 0 0.5em 0;`}>{children}</h5>;
      
    case 'heading-six':
      return <h6 style={style} className={css`margin: 1em 0 0.5em 0;`}>{children}</h6>;
      
    case 'blockquote':
      return (
        <blockquote 
          style={style} 
          className={css`
            border-left: 2px solid #ddd;
            margin-left: 0;
            margin-right: 0;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
          `}
        >
          {children}
        </blockquote>
      );
      
    case 'code-block':
      return (
        <pre 
          className={css`
            padding: 10px;
            background-color: #f8f8f8;
            border-radius: 3px;
            font-family: monospace;
            overflow-x: auto;
          `}
        >
          <code>{children}</code>
        </pre>
      );
      
    case 'bulleted-list':
      return <ul className={css`padding-left: 20px;`}>{children}</ul>;
      
    case 'numbered-list':
      return <ol className={css`padding-left: 20px;`}>{children}</ol>;
      
    case 'list-item':
      return <li style={style}>{children}</li>;
      
    case 'image': {
      const imageElement = element as ImageElement;
      return (
        <figure 
          className={css`
            margin: 1em 0;
            text-align: center;
          `}
        >
          <img
            src={imageElement.url}
            alt={imageElement.alt || ''}
            className={css`
              max-width: 100%;
              max-height: 400px;
            `}
          />
          {imageElement.caption && (
            <figcaption 
              className={css`
                color: #888;
                font-size: 0.9em;
                margin-top: 0.5em;
              `}
            >
              {imageElement.caption}
            </figcaption>
          )}
        </figure>
      );
    }
      
    case 'table':
      return (
        <div 
          className={css`
            overflow-x: auto;
            margin: 1em 0;
          `}
        >
          <table 
            className={css`
              border-collapse: collapse;
              width: 100%;
            `}
          >
            <tbody>{children}</tbody>
          </table>
        </div>
      );
      
    case 'table-row':
      return <tr>{children}</tr>;
      
    case 'table-cell': {
      const cellElement = element as TableCellElement;
      const cellTag = cellElement.header ? 'th' : 'td';
      
      return React.createElement(
        cellTag,
        {
          style,
          className: css`
            border: 1px solid #ddd;
            padding: 8px;
            ${cellElement.header ? 'background-color: #f2f2f2; font-weight: bold;' : ''}
          `
        },
        children
      );
    }
      
    default:
      return <p style={style}>{children}</p>;
  }
};

export default Element; 