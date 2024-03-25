import './App.css';
import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

// lib to create code editor
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

// shadcn components
import { Button } from '@/components/ui/button';
import CreateButton from './components/CreateButton';

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
  const [copy, setCopy] = useState(false);

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
    setCopy(false);
  };

  return (
    <>
      <div className="h-16 px-4 relative z-10 flex items-center justify-between shadow">
        <h1 className="text-xl font-bold md:text-2xl">Codebits</h1>
        <CreateButton
          snippets={snippets}
          setSnippets={setSnippets}
          setValue={setValue}
          setSelectedSnippet={setSelectedSnippet}
          setCopy={setCopy}
        />
      </div>

      {snippets.length === 0 ? (
        <div className="w-full space-y-2 h-[calc(100vh_-_theme(space.8))] flex flex-col justify-center items-center">
          <h1 className="font-bold text-slate-800">
            No snippets available yet...
          </h1>
          <CreateButton
            snippets={snippets}
            setSnippets={setSnippets}
            setValue={setValue}
            setSelectedSnippet={setSelectedSnippet}
            setCopy={setCopy}
          />
        </div>
      ) : (
        <div className="flex relative">
          <div className="h-[calc(100vh_-_theme(space.8))] overflow-auto border-r border-slate-200 flex flex-col w-96">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="flex items-center group border-b border-slate-100 hover:bg-slate-200"
              >
                <button
                  className={`w-full h-full flex flex-col px-4 py-3 text-left ${
                    selectedSnippet === snippet.id ? 'bg-slate-200' : ''
                  }`}
                  onClick={() => {
                    setValue(snippet.code ?? '');
                    setSelectedSnippet(snippet.id);
                    setCopy(false);
                  }}
                >
                  {snippet.title}
                  <span className="line-clamp-1 text-slate-400">
                    {snippet.code}
                  </span>
                </button>
              </div>
            ))}
          </div>
          <CodeMirror
            value={value}
            height="200px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            theme={dracula}
            className="w-full"
          />
          <div className="absolute right-4 top-4 px-2 py-1 flex gap-2 justify-end">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(value);
                setCopy(true);
              }}
              variant={'outline'}
              className="rounded-md"
            >
              {copy ? 'Copied!' : 'Copy'}
            </Button>

            <Button
              className="rounded-md aspect-square"
              variant={'destructive'}
              onClick={() => {
                setSnippets(
                  snippets.filter((snippet) => snippet.id !== selectedSnippet)
                );
                setCopy(false);
              }}
            >
              <FaRegTrashCan width={32} height={32} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
