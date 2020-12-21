import React from "react";

interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
}

export function Form({ children, onSubmit }: Props) {

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(); }}>
      {children}
    </form>
  );

}
