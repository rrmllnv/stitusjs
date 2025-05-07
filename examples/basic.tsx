import React, { useState } from 'react';
import { ScribendijsEditor, createEmptyDocument, EditorContent } from '../src';

const BasicExample: React.FC = () => {
  const [content, setContent] = useState<EditorContent>(createEmptyDocument());

  const handleChange = (newContent: EditorContent) => {
    setContent(newContent);
    console.log('Content updated:', JSON.stringify(newContent, null, 2));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Scribendijs Basic Example</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p>This is a basic example of the Scribendijs editor. Try formatting text using the toolbar.</p>
      </div>
      
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
        <ScribendijsEditor
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