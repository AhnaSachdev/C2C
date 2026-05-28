import { motion } from "framer-motion"
import { MousePointer2, Type, Square, Circle, PenTool, LayoutTemplate, Maximize2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhiteboardPage() {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex overflow-hidden bg-[#050505] text-white">
      
      {/* Left Toolbar */}
      <div className="w-16 h-full bg-black/60 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-4 gap-4 z-10">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl"><MousePointer2 className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon" className="text-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl border border-cyan-500/50"><PenTool className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl"><Type className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl"><Square className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl"><Circle className="h-5 w-5" /></Button>
        
        <div className="flex-1" />
        
        <div className="flex flex-col gap-2">
          {["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-white"].map(color => (
            <div key={color} className={`w-6 h-6 rounded-full ${color} cursor-pointer hover:scale-110 transition-transform`} />
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-dot-pattern">
        
        {/* Fake Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Top Floating Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Live Collaboration</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold border border-black z-30">Y</div>
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold border border-black z-20">A</div>
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold border border-black z-10">M</div>
          </div>
        </div>

        {/* Mock Canvas Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            {/* Fake drawings */}
            <div className="absolute -top-32 -left-48 w-64 h-32 border-4 border-pink-500 rounded-3xl" />
            <div className="absolute top-10 left-20 w-40 h-10 border-b-4 border-cyan-500 rotate-[-15deg]" />
            <div className="absolute -bottom-20 right-10 p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg text-yellow-200 rotate-3 backdrop-blur-sm">
              Remember to check security protocols!
            </div>

            {/* Fake cursor of another user */}
            <motion.div 
              animate={{ x: [0, 150, 100, -50, 0], y: [0, -50, 100, 20, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 flex flex-col items-center z-50"
            >
              <MousePointer2 className="h-5 w-5 text-purple-400 fill-purple-400 -rotate-12" />
              <div className="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full mt-1 ml-4 shadow-lg">Alex</div>
            </motion.div>

            <h1 className="text-6xl font-bold text-white/10 tracking-widest pointer-events-none select-none">CANVAS_SIMULATION</h1>
          </motion.div>
        </div>

        {/* Floating Action Buttons Bottom Right */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <Button variant="glass" size="icon" className="rounded-full shadow-lg h-12 w-12"><LayoutTemplate /></Button>
          <Button variant="glass" size="icon" className="rounded-full shadow-lg h-12 w-12"><Download /></Button>
          <Button variant="glass" size="icon" className="rounded-full shadow-lg h-12 w-12 bg-cyan-600 border-cyan-400 hover:bg-cyan-500"><Maximize2 /></Button>
        </div>
      </div>
    </div>
  )
}
