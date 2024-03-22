import './App.css';
import { useState } from 'react';

// lib to create code editor
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

// lib to generate unique ids
import { v4 as uuidv4 } from 'uuid';

// TODO: Save the snippets in the local storage
// TODO: Load the snippets from the local storage
// TODO: Add a button to clear the code

interface Snippet {
  id: number;
  title: string;
  code?: string;
}

function App() {
  const [value, setValue] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState<number>(0);
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const onChange = (val: string) => {
    // Update the current snippet's code
    setSnippets(
      snippets.map((snippet) => {
        if (snippet.id === selectedSnippet) {
          return {
            ...snippet,
            code: val,
          };
        }
        return snippet;
      })
    );
    setValue(val);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl mb-4">Snippet Manager</h1>

          <button
            onClick={() => {
              const newSnippet = {
                id: uuidv4(),
                title: `New Snippet`,
                code: `Add your code here`,
              };
              setSnippets([...snippets, newSnippet]);
              // Set the new snippet's code as the value
              setValue(newSnippet.code);
              setSelectedSnippet(newSnippet.id);
            }}
          >
            {snippets.length === 0
              ? 'Create your first Snippet'
              : 'Create a New Snippet'}
          </button>
        </div>

        <div className="flex relative gap-4">
          <div className="flex flex-col gap-2 w-96 h-screen overflow-auto">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <button
                  onClick={() => {
                    setValue(snippet.code ?? '');
                    setSelectedSnippet(snippet.id);
                  }}
                  style={
                    selectedSnippet === snippet.id
                      ? { backgroundColor: 'red' }
                      : {}
                  }
                >
                  {snippet.title}
                </button>
                <button
                  onClick={() => {
                    setSnippets(snippets.filter((s) => s.id !== snippet.id));
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {snippets.length === 0 ? (
            <p>No snippets available</p>
          ) : (
            <CodeMirror
              value={value}
              height="200px"
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
              theme={dracula}
              className="w-full"
            />
          )}
          {snippets.length === 0 ? (
            ''
          ) : (
            <button
              onClick={() => {
                navigator.clipboard.writeText(value);
              }}
              className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded-md"
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
