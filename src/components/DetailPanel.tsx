import React, { useState, useEffect } from "react";
import type { Entry } from "../App";
import { patchItem } from "../lib/api";

const R = ["⭐","💀","⚡","❤️"];

export default function DetailPanel({ item, onClose, onChange }: {
  item: Entry | null;
  onClose: () => void;
  onChange: () => void;
}) {
  const [tags, setTags] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  useEffect(() => {
    setTags(item?.tags?.join(", ") || "");
    setNotes(item?.notes || "");
    setRating(item?.rating || "");
  }, [item]);

  if (!item) return null;

  async function save() {
    const tagArr = tags.split(",").map(t => t.trim()).filter(Boolean);
    await patchItem(item.fileId, { tags: tagArr, notes, rating: rating || null });
    onChange();
    onClose();
  }

  return (
    <div className="panel">
      <div className="panel-content">
        <h2>{item.title}</h2>
        <div className="sub">{item.author || "Unknown"}</div>
        <div className="row">
          <label>Tags</label>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="comma,separated,tags" />
        </div>
        <div className="row">
          <label>Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add your notes…" />
        </div>
        <div className="row">
          <label>Rating</label>
          <div className="ratings">
            {R.map(r => (
              <button
                key={r}
                className={r === rating ? "active" : ""}
                onClick={() => setRating(r === rating ? "" : r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="actions">
          <a href={item.driveLink} target="_blank" rel="noreferrer">Open in Drive</a>
          <button onClick={save}>Save</button>
          <button className="secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
