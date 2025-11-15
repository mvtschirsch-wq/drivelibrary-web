import React, { useEffect, useMemo, useState } from "react";
import { authUrl, exportCsvUrl, fetchLibrary, syncNow } from "./lib/api";
import LibraryGrid from "./components/LibraryGrid";
import DetailPanel from "./components/DetailPanel";
import Filters from "./components/Filters";
import Toolbar from "./components/Toolbar";

export type Entry = {
  fileId: string;
  title: string;
  author: string;
  path: string;
  driveLink: string;
  rating: string | null;
  tags: string[];
  notes: string | null;
  createdAt: number;
  fileType: string;
  dateAdded?: string;
};

export default function App() {
  const [items, setItems] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Entry | null>(null);
  const [folderFilter, setFolderFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("");
  const [dark, setDark] = useState(false);

  useEffect(() => { refresh(); }, []);

  async function refresh() {
    const data = await fetchLibrary();
    setItems(data);
  }

  async function handleSync() {
    await syncNow();
    await refresh();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(i => {
      const matchesQ =
        !q ||
        i.title.toLowerCase().includes(q) ||
        (i.author || "").toLowerCase().includes(q) ||
        (i.tags || []).join(" ").toLowerCase().includes(q);
      const matchesFolder = !folderFilter || (i.path || "").startsWith(folderFilter);
      const matchesType = !typeFilter || i.fileType === typeFilter;
      const matchesRating = !ratingFilter || (i.rating || "") === ratingFilter;
      return matchesQ && matchesFolder && matchesType && matchesRating;
    });
  }, [items, query, folderFilter, typeFilter, ratingFilter]);

  const folders = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => { if (i.path) set.add(i.path); });
    return Array.from(set).sort();
  }, [items]);

  const types = ["pdf", "epub", "doc", "other"];
  const ratings = ["⭐","💀","⚡","❤️"];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="container">
        <Toolbar
          query={query}
          onQuery={setQuery}
          onSync={handleSync}
          onAuth={() => window.open(authUrl(), "_blank")}
          onExport={() => window.open(exportCsvUrl(), "_blank")}
          dark={dark}
          setDark={setDark}
        />
        <Filters
          folders={folders}
          types={types}
          ratings={ratings}
          folderFilter={folderFilter}
          typeFilter={typeFilter}
          ratingFilter={ratingFilter}
          onFolder={setFolderFilter}
          onType={setTypeFilter}
          onRating={setRatingFilter}
        />
        <LibraryGrid items={filtered} onSelect={setSelected} />
        <DetailPanel item={selected} onClose={() => setSelected(null)} onChange={refresh} />
      </div>
    </div>
  );
}
