import { Link, useLocation } from "react-router-dom"
import { Shield, Code, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="relative z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/50">
            <Shield className="h-5 w-5 text-cyan-400" />
            <div className="absolute inset-0 animate-ping rounded-lg bg-cyan-500/20 opacity-50" />
          </div>
          <span className="text-xl font-bold tracking-tight">SecureMeet</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
          <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>Home</Link>
          <Link to="/whiteboard" className={`hover:text-white transition-colors ${location.pathname === '/whiteboard' ? 'text-white' : ''}`}>Whiteboard</Link>
          <Link to="/games" className={`hover:text-white transition-colors ${location.pathname === '/games' ? 'text-white' : ''}`}>Games</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <Code className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <Moon className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <Link to="/join">
            <Button variant="ghost" className="text-zinc-300 hover:text-white">Join</Button>
          </Link>
          <Link to="/create">
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400/50 shadow-[0_0_15px_rgba(8,145,178,0.5)]">
              Create Room
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
