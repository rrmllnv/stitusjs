import { StilusjsEditor, createEmptyDocument, EditorContent } from '../src';
import React, { useState } from 'react';

const BasicExample: React.FC = () => {
  const [content, setContent] = useState<EditorContent>(createEmptyDocument());

  const handleChange = (newContent: EditorContent) => {
    setContent(newContent);
    console.log('Content updated:', JSON.stringify(newContent, null, 2));
  };

  return (
    <div className="example-wrapper">
      <div className="example-container">
        <div className="example-header">
          <h1>Stilusjs Basic Example</h1>
        </div>
        
        <div className="example-description">
          <p>This is a basic example of the Stilusjs editor. Try formatting text using the toolbar.</p>
        </div>
        
        <div className="editor-container">
          <StilusjsEditor
            value={content}
            onChange={handleChange}
            config={{
              placeholder: 'Start typing here...',
              enabledFeatures: {
                bold: true,
                italic: true,
                underline: true,
                strikethrough: true,
                heading: true,
                list: true,
                blockquote: true,
                codeBlock: true,
                alignment: true
              }
            }}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Current Editor Content (JSON):</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '3px',
          overflow: 'auto',
          maxHeight: '300px'
        }}>
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default BasicExample; 