import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Shield, Lock, RefreshCw, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function CreateRoomPage() {
  const navigate = useNavigate()
  const [passcode, setPasscode] = useState("A7B2")
  const [roomLink, setRoomLink] = useState("AB3-X9Q-K2L")
  const [usePasscode, setUsePasscode] = useState(true)

  const handleCreate = () => {
    navigate(`/call/${roomLink}`)
  }

  const randomize = () => {
    setPasscode(Math.random().toString(36).substring(2, 6).toUpperCase())
    setRoomLink(`${Math.random().toString(36).substring(2, 5).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`)
  }

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="glass-panel border-cyan-500/30">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <Shield className="h-8 w-8 text-cyan-400" />
            </div>
            <CardTitle className="text-3xl font-bold">New Secure Room</CardTitle>
            <CardDescription className="text-zinc-400">Initialize a military-grade simulated environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Room Name</label>
              <Input placeholder="e.g. Project Alpha Sync" className="bg-black/40 border-white/10" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Your Nickname</label>
              <Input placeholder="Commander Shepard" className="bg-black/40 border-white/10" />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-medium text-white">Enable Passcode</p>
                  <p className="text-xs text-zinc-500">Require code to enter</p>
                </div>
              </div>
              <Switch checked={usePasscode} onCheckedChange={setUsePasscode} />
            </div>

            {usePasscode && (
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Key className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-cyan-400 font-medium">Generated Passcode</p>
                    <p className="text-xl font-mono font-bold tracking-widest text-white">{passcode}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={randomize} className="text-zinc-400 hover:text-white">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <Button onClick={handleCreate} className="w-full h-12 bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                Initialize Room
              </Button>
              <Button variant="ghost" onClick={randomize} className="w-full text-zinc-400">
                Randomize Credentials
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
