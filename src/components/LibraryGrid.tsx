import React from "react";
import type { Entry } from "../App";

export default function LibraryGrid({ items, onSelect }: { items: Entry[]; onSelect: (e: Entry) => void }) {
  return (
    <div className="grid">
      {items.map(i => (
        <div className="card" key={i.fileId} onClick={() => onSelect(i)}>
          <div className="title">{i.title}</div>
          <div className="meta">
            <span>{i.author || "Unknown"}</span>
            <span>• {i.fileType}</span>
          </div>
          <div className="tags">{(i.tags || []).map(t => <span key={t} className="tag">{t}</span>)}</div>
          <div className="actions">
            <a href={i.driveLink} target="_blank" rel="noreferrer">Open in Drive</a>
            <span className="rating">{i.rating || ""}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
