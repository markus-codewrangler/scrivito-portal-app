import {
  openNewConversation,
  resumeConversation,
  subscribeToVisibility,
} from '@justrelate/ai-assistant'
import { useEffect, useState } from 'react'

export function AssistantButtons() {
  const [assistantVisible, setAssistantVisible] = useState(false)
  useEffect(() => subscribeToVisibility(setAssistantVisible), [])

  if (assistantVisible) return null

  return (
    <>
      <button onClick={() => openNewConversation()}>New Chat</button>
      <button
        onClick={() => openNewConversation({ userPrompt: 'What is Scrivito?' })}
      >
        New Chat with user prompt
      </button>
      <button onClick={resumeConversation}>Resume Chat</button>
    </>
  )
}
