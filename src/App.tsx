import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "@/layouts/Layout"
import { LandingPage } from "@/pages/LandingPage"
import { CreateRoomPage } from "@/pages/CreateRoomPage"
import { JoinRoomPage } from "@/pages/JoinRoomPage"
import { RoomPage } from "@/pages/RoomPage"
import { WhiteboardPage } from "@/pages/WhiteboardPage"
import { GamesPage } from "@/pages/GamesPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="create" element={<CreateRoomPage />} />
          <Route path="join" element={<JoinRoomPage />} />
          <Route path="whiteboard" element={<WhiteboardPage />} />
          <Route path="games" element={<GamesPage />} />
        </Route>
        {/* Room page is outside standard layout because it needs full screen */}
        <Route path="/call/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  )
}

export default App
