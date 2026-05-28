import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, MicOff, Video, VideoOff, MonitorUp, Settings, 
  MessageSquare, Users, PhoneOff, Shield, Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Fake Participants
const INITIAL_PARTICIPANTS = [
  { id: "1", name: "You", initial: "Y", color: "bg-cyan-500", isSpeaking: false, isMuted: false, hasVideo: true, quality: "good" },
  { id: "2", name: "Alex Chen", initial: "A", color: "bg-purple-500", isSpeaking: true, isMuted: false, hasVideo: true, quality: "good" },
  { id: "3", name: "Sarah Connor", initial: "S", color: "bg-pink-500", isSpeaking: false, isMuted: true, hasVideo: false, quality: "poor" },
  { id: "4", name: "Mike Ross", initial: "M", color: "bg-amber-500", isSpeaking: false, isMuted: false, hasVideo: true, quality: "good" },
]

export function RoomPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS)
  const [sidebarOpen, setSidebarOpen] = useState<'chat' | 'users' | 'settings' | null>(null)
  
  // Controls state
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  // Timer
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Simulate speaking animation randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => prev.map(p => {
        if (p.id === "1" && isMuted) return { ...p, isSpeaking: false }
        if (p.isMuted) return { ...p, isSpeaking: false }
        return {
          ...p,
          isSpeaking: Math.random() > 0.7
        }
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [isMuted])

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white flex flex-col overflow-hidden relative font-sans">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 h-16 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <Badge variant="secure" className="px-3 py-1 text-sm font-mono shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            <Shield className="h-4 w-4 mr-2" />
            AES-256 E2EE Active
          </Badge>
          <div className="h-4 w-px bg-white/20" />
          <span className="font-mono text-zinc-400">{roomId || 'ROOM-SIM-999'}</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Activity className="h-4 w-4 text-green-400" />
            <span className="font-mono text-sm">24ms</span>
          </div>
          <div className="font-mono text-white bg-white/10 px-3 py-1 rounded-md">
            {formatTime(time)}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative z-10 p-4 gap-4">
        
        {/* Video Grid */}
        <div className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "pr-0" : ""
        )}>
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
            {participants.map((p) => (
              <VideoCard 
                key={p.id} 
                participant={p} 
                isSelf={p.id === "1"} 
                isMuted={p.id === "1" ? isMuted : p.isMuted}
                isVideoOn={p.id === "1" ? isVideoOn : p.hasVideo}
              />
            ))}
          </div>
        </div>

        {/* Sidebar Panel */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-bold text-lg capitalize">{sidebarOpen}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(null)}>✕</Button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {sidebarOpen === 'chat' && <div className="text-zinc-500 text-center mt-10">Chat simulation empty</div>}
                {sidebarOpen === 'users' && (
                  <div className="space-y-4">
                    {participants.map(p => (
                      <div key={p.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center font-bold text-xs`}>
                            {p.initial}
                          </div>
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                        <div className="flex gap-2">
                          {(p.id === "1" ? isMuted : p.isMuted) ? <MicOff className="h-4 w-4 text-red-400" /> : <Mic className="h-4 w-4 text-zinc-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {sidebarOpen === 'settings' && <div className="text-zinc-500 text-center mt-10">Mock settings panel</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Control Bar */}
      <footer className="relative z-20 h-24 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center px-8 gap-4">
        <ControlButton 
          active={!isMuted} 
          danger={isMuted}
          icon={isMuted ? <MicOff /> : <Mic />} 
          label={isMuted ? "Unmute" : "Mute"} 
          onClick={() => setIsMuted(!isMuted)} 
        />
        <ControlButton 
          active={isVideoOn} 
          danger={!isVideoOn}
          icon={!isVideoOn ? <VideoOff /> : <Video />} 
          label={!isVideoOn ? "Start Video" : "Stop Video"} 
          onClick={() => setIsVideoOn(!isVideoOn)} 
        />
        
        <div className="w-px h-10 bg-white/10 mx-2" />
        
        <ControlButton 
          active={isScreenSharing} 
          icon={<MonitorUp />} 
          label="Share" 
          onClick={() => setIsScreenSharing(!isScreenSharing)} 
        />
        
        <div className="w-px h-10 bg-white/10 mx-2" />
        
        <ControlButton 
          active={sidebarOpen === 'chat'} 
          icon={<MessageSquare />} 
          label="Chat" 
          onClick={() => setSidebarOpen(sidebarOpen === 'chat' ? null : 'chat')} 
        />
        <ControlButton 
          active={sidebarOpen === 'users'} 
          icon={<Users />} 
          label="People" 
          onClick={() => setSidebarOpen(sidebarOpen === 'users' ? null : 'users')} 
        />
        <ControlButton 
          active={sidebarOpen === 'settings'} 
          icon={<Settings />} 
          label="Settings" 
          onClick={() => setSidebarOpen(sidebarOpen === 'settings' ? null : 'settings')} 
        />
        
        <div className="flex-1" />
        
        <Button 
          onClick={() => navigate('/')}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
          <PhoneOff className="h-5 w-5 mr-2" />
          Leave
        </Button>
      </footer>
    </div>
  )
}

function ControlButton({ active, danger, icon, label, onClick }: { active?: boolean, danger?: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        onClick={onClick}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 border",
          danger 
            ? "bg-red-500/20 text-red-500 border-red-500/30 hover:bg-red-500/30" 
            : active 
              ? "bg-white/10 text-white border-white/20 hover:bg-white/20" 
              : "bg-transparent text-zinc-400 border-transparent hover:bg-white/5"
        )}
      >
        {icon}
      </button>
      <span className="text-[10px] font-medium text-zinc-400">{label}</span>
    </div>
  )
}

function VideoCard({ participant, isSelf, isMuted, isVideoOn }: any) {
  return (
    <div className={cn(
      "relative rounded-2xl overflow-hidden bg-zinc-900 border-2 transition-all duration-300 flex items-center justify-center",
      participant.isSpeaking ? "border-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.3)]" : "border-white/5"
    )}>
      {/* Background Simulation / Video off state */}
      {!isVideoOn ? (
        <div className={`w-24 h-24 rounded-full ${participant.color} flex items-center justify-center text-4xl font-bold`}>
          {participant.initial}
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex items-center justify-center">
           {/* Mock Video Stream Visual */}
           <div className={`w-32 h-32 rounded-full ${participant.color} blur-3xl opacity-20 animate-pulse-glow`} />
           <div className="text-zinc-600 font-mono text-sm absolute">Simulated Stream</div>
        </div>
      )}

      {/* Overlay info */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
          <span className="text-sm font-medium">{participant.name} {isSelf && "(You)"}</span>
        </div>
        
        <div className="flex gap-2">
          {isMuted ? (
            <div className="bg-red-500/80 p-2 rounded-lg text-white">
              <MicOff className="h-4 w-4" />
            </div>
          ) : participant.isSpeaking ? (
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="bg-cyan-500/80 p-2 rounded-lg text-white"
            >
              <Mic className="h-4 w-4" />
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
