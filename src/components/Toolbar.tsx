import React from "react";

export default function Toolbar(props: {
  query: string;
  onQuery: (s: string) => void;
  onSync: () => void;
  onAuth: () => void;
  onExport: () => void;
  dark: boolean;
  setDark: (b: boolean) => void;
}) {
  return (
    <div className="toolbar">
      <input
        placeholder="Search title, author, tags…"
        value={props.query}
        onChange={e => props.onQuery(e.target.value)}
      />
      <button onClick={props.onSync}>Sync now</button>
      <button onClick={props.onAuth}>Authenticate</button>
      <button onClick={props.onExport}>Export CSV</button>
      <label className="toggle">
        <input type="checkbox" checked={props.dark} onChange={e => props.setDark(e.target.checked)} />
        <span>Dark mode</span>
      </label>
    </div>
  );
}
