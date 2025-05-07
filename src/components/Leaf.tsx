import React from 'react';
import { TextNode } from '../types';
import { css } from '@emotion/css';

interface LeafProps {
  leaf: TextNode;
  children: React.ReactNode;
}

const Leaf: React.FC<LeafProps> = ({ leaf, children }) => {
  let textStyles = '';
  
  if (leaf.bold) {
    textStyles += `font-weight: bold;`;
  }
  
  if (leaf.italic) {
    textStyles += `font-style: italic;`;
  }
  
  if (leaf.underline) {
    textStyles += `text-decoration: underline;`;
  }
  
  if (leaf.strikethrough) {
    textStyles += `text-decoration: line-through;`;
  }
  
  if (leaf.code) {
    textStyles += `
      font-family: monospace;
      background-color: rgba(0, 0, 0, 0.05);
      padding: 2px 4px;
      border-radius: 3px;
    `;
  }
  
  if (leaf.superscript) {
    textStyles += `
      vertical-align: super;
      font-size: smaller;
    `;
  }
  
  if (leaf.subscript) {
    textStyles += `
      vertical-align: sub;
      font-size: smaller;
    `;
  }

  const leafClass = css`${textStyles}`;
  
  return (
    <span className={leafClass}>
      {children}
    </span>
  );
};

export default Leaf; 