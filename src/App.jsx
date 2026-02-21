/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, Play, ArrowLeft, Trophy, Zap, Ghost, Target, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

const CATEGORIES = ['All', 'Action', 'Arcade', 'Puzzle', 'Sports', 'IO'];

const CATEGORY_ICONS = {
  'All': Gamepad2,
  'Action': Zap,
  'Arcade': Ghost,
  'Puzzle': Target,
  'Sports': Dumbbell,
  'IO': Trophy
};

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:rotate-12 transition-transform">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              XENOVERSE 4
            </span>
          </div>

          {!selectedGame && (
            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              About
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
              Join Discord
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    {selectedGame.category}
                  </span>
                  <h1 className="text-2xl font-display font-bold">{selectedGame.title}</h1>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedGame.title}
                />
              </div>

              <div className="glass rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-2">About {selectedGame.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{selectedGame.description}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="relative rounded-[2.5rem] overflow-hidden bg-zinc-900 p-12 flex flex-col items-center text-center gap-6 border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent)]" />
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-display font-black tracking-tighter max-w-3xl"
                >
                  PLAY THE BEST <span className="text-red-500">UNBLOCKED</span> GAMES
                </motion.h2>
                <p className="text-zinc-400 text-lg max-w-xl">
                  Instant access to your favorite web games. No downloads, no blocks, just pure fun.
                </p>
                <div className="flex gap-4">
                  <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-500/20 transition-all hover:scale-105">
                    Start Playing
                  </button>
                  <button className="glass px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                    Browse Categories
                  </button>
                </div>
              </section>

              {/* Categories */}
              <div className="flex flex-wrap gap-3 justify-center">
                {CATEGORIES.map(cat => {
                  const Icon = CATEGORY_ICONS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                        activeCategory === cat 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' 
                        : 'glass text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map((game, idx) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative flex flex-col glass rounded-[2rem] overflow-hidden game-card-hover cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Play className="text-white fill-current w-8 h-8 ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                          {game.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">{game.title}</h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">{game.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <Ghost className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-zinc-500">No games found</h3>
                  <p className="text-zinc-600">Try adjusting your search or category filter</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-zinc-400 w-5 h-5" />
            </div>
            <span className="font-display font-bold text-zinc-400">XENOVERSE 4</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 XENOVERSE 4. All rights reserved. Built for speed and accessibility.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
