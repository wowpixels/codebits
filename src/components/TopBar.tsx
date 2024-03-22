import React from "react";
import Select from "./Select";
import Toggle from "./Toggle";

interface TopBarProps {
    select: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        options: React.ReactNode;
    };
    toggle: {
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    language: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        options: React.ReactNode;
    };
}

export default function TopBar({ select, toggle, language }: TopBarProps) {
  return (
    <div className="list-reset flex flex-wrap items-center justify-between my-2">
      <Toggle {...toggle} />
      <Select {...language} />
      {/* <Select {...select} /> */}
    </div>
  );
}