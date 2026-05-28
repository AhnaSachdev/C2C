import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Shield, Video, Users, Gamepad2, PenTool, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 mb-8">
          <Lock className="mr-2 h-4 w-4" />
          End-to-End Encrypted Simulation
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Secure Meetings, <br />
          <span className="gradient-text">Zero Compromise.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
          A fully simulated, ultra-secure video collaboration platform. 
          Experience military-grade UI without actual data leaving your browser.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link to="/create">
            <Button size="lg" className="h-14 px-8 text-lg bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_30px_rgba(8,145,178,0.5)] border border-cyan-400/50 w-full sm:w-auto">
              <Video className="mr-2 h-5 w-5" />
              Create Secure Room
            </Button>
          </Link>
          <Link to="/join">
            <Button size="lg" variant="glass" className="h-14 px-8 text-lg w-full sm:w-auto">
              <Users className="mr-2 h-5 w-5" />
              Join with Code
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <FeatureCard 
          icon={<Shield className="h-8 w-8 text-green-400" />}
          title="AES-256 Simulation"
          description="Visual indicators demonstrating robust encryption and deep resolution security checks."
        />
        <FeatureCard 
          icon={<Gamepad2 className="h-8 w-8 text-purple-400" />}
          title="Mini Games"
          description="Engage your participants with built-in activities like Scribble, Higher/Lower, and Atlas."
        />
        <FeatureCard 
          icon={<PenTool className="h-8 w-8 text-pink-400" />}
          title="Interactive Whiteboard"
          description="Collaborate in real-time with an expansive drawing canvas, sticky notes, and diagrams."
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-8 rounded-2xl flex flex-col items-start text-left"
    >
      <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}
