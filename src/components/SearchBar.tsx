import { Search } from "lucide-react";
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <div className="flex gap-3 w-full max-w-xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search for a meal..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card text-card-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow card-shadow"
        />
      </div>
      <button
        onClick={submit}
        disabled={loading || !value.trim()}
        className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
}
