'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/react/24/solid';

// Dummy API endpoint for price data (can be replaced with any public API)
const DUMMY_API = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const COINGECKO_API = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';

const getRandomDirection = () => (Math.random() > 0.5 ? 'up' : 'down');
const getRandomPnl = () => (Math.random() > 0.5 ? (Math.random() * 50).toFixed(2) : (-Math.random() * 50).toFixed(2));

export default function ChartPage() {
    const [data, setData] = useState<{ time: string; price: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [trades, setTrades] = useState<any[]>([]);

    // Fetch price data and simulate real-time updates
    useEffect(() => {
        let interval: NodeJS.Timeout;
        const fetchData = async () => {
            try {
                const res = await fetch(COINGECKO_API);
                const json = await res.json();
                // json.prices is an array of [timestamp, price]
                const prices = json.prices.slice(-30).map(([timestamp, price]: [number, number]) => ({
                    time: new Date(timestamp).toLocaleTimeString(),
                    price,
                }));
                setData(prices);
                // Add a dummy trade using the latest price
                const latest = prices[prices.length - 1];
                setTrades((prev) => [
                    {
                        time: latest.time,
                        price: latest.price.toFixed(2),
                        direction: getRandomDirection(),
                        pnl: getRandomPnl(),
                    },
                    ...prev.slice(0, 9),
                ]);
                setLoading(false);
            } catch (e) {
                // On error, do not update data or trades
                setLoading(false);
            }
        };
        fetchData();
        interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-[#181B20] flex flex-col items-center py-8 px-2 md:px-8">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
                {/* Main Chart and Table */}
                <div className="flex-1">
                    <div className="bg-[#23262B] rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white">BTC / USD</h1>
                                <span className="text-green-400 text-sm">Live</span>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-orange-400">${data.length ? data[data.length - 1].price.toLocaleString() : '--'}</div>
                                <div className="text-xs text-gray-400">Updated: {data.length ? data[data.length - 1].time : '--'}</div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="time" stroke="#aaa" />
                                <YAxis domain={['auto', 'auto']} stroke="#aaa" />
                                <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                                <Line type="monotone" dataKey="price" stroke="#00e676" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Trades Table */}
                    <div className="bg-[#23262B] rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Latest Price Data</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-gray-300">
                                <thead>
                                    <tr className="bg-[#20232A]">
                                        <th className="px-4 py-2 text-left">Time</th>
                                        <th className="px-4 py-2 text-left">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((point, idx) => (
                                        <tr key={idx} className="border-b border-[#23262B] hover:bg-[#20232A]">
                                            <td className="px-4 py-2">{point.time}</td>
                                            <td className="px-4 py-2">${point.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Trades Table */}
                    <div className="bg-[#23262B] rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Recent Trades</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-gray-300">
                                <thead>
                                    <tr className="bg-[#20232A]">
                                        <th className="px-4 py-2 text-left">Time</th>
                                        <th className="px-4 py-2 text-left">Price</th>
                                        <th className="px-4 py-2 text-left">Direction</th>
                                        <th className="px-4 py-2 text-left">P&L</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trades.map((trade, idx) => (
                                        <tr key={idx} className="border-b border-[#23262B] hover:bg-[#20232A]">
                                            <td className="px-4 py-2">{trade.time}</td>
                                            <td className="px-4 py-2">${trade.price}</td>
                                            <td className="px-4 py-2">
                                                {trade.direction === 'up' ? (
                                                    <span className="flex items-center text-green-400 font-semibold">
                                                        <ArrowUpRightIcon className="w-4 h-4 mr-1" /> Up
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-red-400 font-semibold">
                                                        <ArrowDownRightIcon className="w-4 h-4 mr-1" /> Down
                                                    </span>
                                                )}
                                            </td>
                                            <td className={`px-4 py-2 font-semibold ${parseFloat(trade.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{parseFloat(trade.pnl) >= 0 ? '+' : ''}{trade.pnl}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Right Panel Controls */}
                <aside className="w-full md:w-80 flex-shrink-0">
                    <div className="bg-[#23262B] rounded-xl shadow-lg p-6 mb-6">
                        <div className="mb-4">
                            <div className="text-gray-400 text-xs mb-1">WILL THE PRICE GO UP OR DOWN?</div>
                            <div className="flex gap-2 mb-4">
                                <button className="flex-1 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold">Up</button>
                                <button className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold">Down</button>
                            </div>
                            <div className="text-gray-400 text-xs mb-1">WAGER</div>
                            <div className="flex gap-2 mb-4">
                                <input type="number" className="flex-1 py-2 px-3 rounded bg-[#181B20] text-white border border-[#333]" placeholder="Amount" defaultValue={100} />
                                <button className="px-3 py-2 rounded bg-[#181B20] text-white border border-[#333]">1/2</button>
                                <button className="px-3 py-2 rounded bg-[#181B20] text-white border border-[#333]">2x</button>
                            </div>
                            <div className="text-gray-400 text-xs mb-1">PAYOUT MULTIPLIER</div>
                            <input type="range" min={1} max={100} defaultValue={10} className="w-full mb-4" />
                            <div className="flex justify-between text-xs text-gray-400 mb-4">
                                <span>x1 Safe</span>
                                <span>Wild x100</span>
                            </div>
                            <button className="w-full py-3 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg shadow">PLACE BET</button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
} 