import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';
import './Widgets.css';

const COINS = ['bitcoin', 'ethereum', 'solana'];

const CryptoTracker = () => {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(',')}&vs_currencies=usd&include_24hr_change=true`
                );
                const data = await response.json();
                setPrices(data);
                setLoading(false);
            } catch (error) {
                console.error("Crypto fetch failed", error);
                setLoading(false);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="glass-panel widget-crypto">
            <div className="crypto-header">INITIALIZING MARKET DATA...</div>
        </div>
    );

    return (
        <div className="glass-panel widget-crypto">
            <div className="crypto-header">
                <Bitcoin size={18} color="var(--primary)" />
                <span>MARKET TICKER</span>
            </div>
            <div className="crypto-list">
                {COINS.map(coin => {
                    const data = prices[coin];
                    if (!data) return null;
                    const isPositive = data.usd_24h_change >= 0;

                    return (
                        <div key={coin} className="crypto-item">
                            <span className="coin-name">{coin.toUpperCase()}</span>
                            <div className="coin-price-group">
                                <span className="coin-price">${data.usd.toLocaleString()}</span>
                                <span className={`coin-change ${isPositive ? 'pos' : 'neg'}`}>
                                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {Math.abs(data.usd_24h_change).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CryptoTracker;
