import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import './Widgets.css';

const OmniSearch = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) return;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        setQuery('');
    };

    return (
        <div className="glass-panel widget-search">
            <form onSubmit={handleSearch} className="search-form">
                <Search size={24} color="var(--primary)" />
                <input
                    type="text"
                    placeholder="INITIATE SEARCH PROTOCOL..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                />
                <button type="submit" className="search-btn">
                    <ArrowRight size={20} />
                </button>
            </form>
        </div>
    );
};

export default OmniSearch;
