import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/shared/Navbar"

export function Layout() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />
      
      <main className="flex-1 relative z-10 w-full">
        <Outlet />
      </main>
    </div>
  )
}
