import './App.css';
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

// TODO: Save the snippets in the local storage
// TODO: Load the snippets from the local storage
// TODO: Add a button to delete the snippet
// TODO: Add a button to create a new snippet
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
        <h1>Snippet Manager</h1>
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
                selectedSnippet === snippet.id ? { backgroundColor: 'red' } : {}
              }
            >
              {snippet.title}
            </button>

            {/* // TODO:
              Create a button to delete the snippet
            */}
          </div>
        ))}

        <CodeMirror
          value={value}
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          theme={dracula}
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
          }}
        >
          Copy
        </button>

        <button
          onClick={() => {
            const newSnippet = {
              id: snippets.length + 1,
              title: `New Snippet ${snippets.length + 1}`,
              code: `a New snippet ${snippets.length + 1}`,
            };
            setSnippets([...snippets, newSnippet]);
            // Set the new snippet's code as the value
            setValue(newSnippet.code);
            setSelectedSnippet(newSnippet.id);
          }}
        >
          Create a New Snippet
        </button>
      </div>
    </>
  );
}

export default App;
