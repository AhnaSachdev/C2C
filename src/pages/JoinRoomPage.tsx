import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, ArrowRight, ScanLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function JoinRoomPage() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState("")
  const [passcode, setPasscode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setTimeout(() => {
      navigate(`/call/${roomId || "SIMULATED-ROOM"}`)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="glass-panel border-purple-500/30 overflow-hidden relative">
          <AnimatePresence>
            {isVerifying && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
              >
                <ScanLine className="h-16 w-16 text-purple-400 animate-pulse-glow mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Verifying Credentials</h3>
                <p className="text-sm text-purple-300 font-mono">Establishing secure handshake...</p>
                
                {/* Fake progress bar */}
                <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30">
              <ShieldAlert className="h-8 w-8 text-purple-400" />
            </div>
            <CardTitle className="text-3xl font-bold">Join Room</CardTitle>
            <CardDescription className="text-zinc-400">Enter secure coordinates to connect.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleJoin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Room ID or Link</label>
                <Input 
                  required
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                  placeholder="AB3-X9Q-K2L" 
                  className="bg-black/40 border-white/10 font-mono text-center text-lg tracking-widest uppercase" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Passcode</label>
                <Input 
                  type="password"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  placeholder="••••" 
                  className="bg-black/40 border-white/10 font-mono text-center text-lg tracking-widest" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Your Nickname</label>
                <Input 
                  required
                  placeholder="Guest Agent" 
                  className="bg-black/40 border-white/10" 
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  Connect Securely <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
