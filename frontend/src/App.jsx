import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ChatWindow  from './components/ChatWindow'

export default function App() {
  const [view, setView]                 = useState('landing')  // 'landing' | 'chat'
  const [initialMessage, setInitialMessage] = useState(null)

  const startChat = (message) => {
    setInitialMessage(message)
    setView('chat')
  }

  const goBack = () => {
    setView('landing')
    setInitialMessage(null)
  }

  return (
    <div className="min-h-screen bg-[#020617]">
      {view === 'landing' ? (
        <LandingPage onStartChat={startChat} />
      ) : (
        <ChatWindow onBack={goBack} initialMessage={initialMessage} />
      )}
    </div>
  )
}
