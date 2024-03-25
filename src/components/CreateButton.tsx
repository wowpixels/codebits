import React from 'react';

// shadcn components
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

interface CreateButtonProps {
  snippets: [];
  setSnippets: React.Dispatch<React.SetStateAction<[]>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSnippet: React.Dispatch<React.SetStateAction<number>>;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateButton = ({
  snippets,
  setSnippets,
  setValue,
  setSelectedSnippet,
  setCopy,
}: CreateButtonProps) => {
  return (
    <Button
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
        setCopy(false);
      }}
    >
      {snippets.length === 0
        ? 'Create your first Snippet'
        : 'Create a New Snippet'}
    </Button>
  );
};

export default CreateButton;
