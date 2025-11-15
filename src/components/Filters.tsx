import React from "react";

export default function Filters(props: {
  folders: string[];
  types: string[];
  ratings: string[];
  folderFilter: string;
  typeFilter: string;
  ratingFilter: string;
  onFolder: (s: string) => void;
  onType: (s: string) => void;
  onRating: (s: string) => void;
}) {
  return (
    <div className="filters">
      <select value={props.folderFilter} onChange={e => props.onFolder(e.target.value)}>
        <option value="">All folders</option>
        {props.folders.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <select value={props.typeFilter} onChange={e => props.onType(e.target.value)}>
        <option value="">All types</option>
        {props.types.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select value={props.ratingFilter} onChange={e => props.onRating(e.target.value)}>
        <option value="">All ratings</option>
        {props.ratings.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}
