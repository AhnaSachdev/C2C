import { useState } from "react"
import { motion } from "framer-motion"
import { Gamepad2, Pencil, Hash, MapPin, Trophy, Users, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function GamesPage() {
  const [activeGame, setActiveGame] = useState('scribble')

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col md:flex-row overflow-hidden bg-[#0a0a0a] text-white p-4 gap-4">
      
      {/* Sidebar: Game Selection */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 px-2">
          <Gamepad2 className="text-purple-400" />
          Mini Games
        </h2>
        
        <div className="flex flex-col gap-2">
          <GameSelectBtn active={activeGame === 'scribble'} onClick={() => setActiveGame('scribble')} icon={<Pencil className="w-4 h-4" />} label="Scribble Guess" />
          <GameSelectBtn active={activeGame === 'higherlower'} onClick={() => setActiveGame('higherlower')} icon={<Hash className="w-4 h-4" />} label="Number Guess" />
          <GameSelectBtn active={activeGame === 'atlas'} onClick={() => setActiveGame('atlas')} icon={<MapPin className="w-4 h-4" />} label="Atlas" />
        </div>

        <Card className="mt-auto bg-black/40 border-white/10">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" /> Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm space-y-2">
            <div className="flex justify-between items-center"><span className="text-zinc-400">1. Alex</span><span className="font-mono text-purple-400">1,240</span></div>
            <div className="flex justify-between items-center"><span className="text-zinc-400">2. You</span><span className="font-mono text-cyan-400">980</span></div>
            <div className="flex justify-between items-center"><span className="text-zinc-400">3. Sarah</span><span className="font-mono text-pink-400">850</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 glass-panel rounded-2xl border-purple-500/30 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
        
        {activeGame === 'scribble' && (
          <div className="flex-1 flex flex-col h-full relative z-10">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
              <div className="flex items-center gap-4">
                <span className="text-zinc-400 text-sm">Category:</span>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">Animals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-sm">Time left:</span>
                <span className="font-mono text-xl font-bold text-red-400">00:42</span>
              </div>
            </div>
            
            <div className="flex-1 flex">
              {/* Canvas Area */}
              <div className="flex-1 border-r border-white/10 p-8 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-lg aspect-video bg-white/5 rounded-xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center"
                >
                   {/* Fake Drawing */}
                   <svg width="200" height="200" viewBox="0 0 100 100" className="absolute">
                     <path d="M 20 80 Q 50 10 80 80" fill="none" stroke="#a855f7" strokeWidth="4" />
                     <circle cx="50" cy="40" r="15" fill="none" stroke="#a855f7" strokeWidth="4" />
                   </svg>
                   <div className="absolute bottom-4 left-4 flex gap-2">
                     <div className="w-4 h-4 rounded-full bg-purple-500 ring-2 ring-white" />
                     <div className="w-4 h-4 rounded-full bg-white ring-2 ring-black" />
                   </div>
                </motion.div>
              </div>
              
              {/* Chat Area */}
              <div className="w-72 flex flex-col bg-black/40">
                <div className="p-3 border-b border-white/10 flex items-center gap-2">
                  <Users className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">Live Guesses</span>
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
                  <div className="text-zinc-400"><span className="text-purple-400 font-bold">Alex:</span> A mountain?</div>
                  <div className="text-zinc-400"><span className="text-cyan-400 font-bold">You:</span> A tent?</div>
                  <div className="text-green-400 font-bold text-center my-2 p-2 bg-green-500/10 rounded border border-green-500/20">Sarah guessed the word!</div>
                </div>
                <div className="p-3 border-t border-white/10 bg-white/5">
                  <div className="relative">
                    <Input placeholder="Type your guess..." className="pr-10 bg-black/60 border-white/20" />
                    <Button size="icon" variant="ghost" className="absolute right-1 top-1 w-8 h-8 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeGame !== 'scribble' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <h2 className="text-3xl font-bold mb-4">{activeGame === 'higherlower' ? 'Number Guess' : 'Atlas'}</h2>
            <p className="text-zinc-400 max-w-md">Module currently initializing in simulation mode. Check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function GameSelectBtn({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border text-sm font-medium
        ${active 
          ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
          : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
        }`}
    >
      {icon}
      {label}
    </button>
  )
}
