'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleQuickSearch = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <div className="space-y-4" suppressHydrationWarning>
      <form onSubmit={handleSubmit} className="flex gap-2" suppressHydrationWarning>
        <Input
          type="text"
          placeholder="Search for a city (e.g., New York, London, Tokyo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
          disabled={loading}
          suppressHydrationWarning
        />
        <Button
          type="submit"
          disabled={loading}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          suppressHydrationWarning
        >
          <Search className="w-4 h-4" />
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </form>

      {/* Quick search suggestions */}
      <div className="flex flex-wrap gap-2" suppressHydrationWarning>
        <span className="text-sm text-blue-200">Quick search:</span>
        {['New York', 'London', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
          <button
            key={city}
            onClick={() => handleQuickSearch(city)}
            disabled={loading}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600 text-blue-200 hover:text-blue-100 rounded-full text-sm transition-colors disabled:opacity-50"
            suppressHydrationWarning
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
