import { useEffect, useState } from 'react'
import {
  openNewConversation,
  resumeConversation,
} from '@justrelate/ai-assistant'
import { onAssistantClosed } from '../utils/assistantEvents'

export function AssistantButtons() {
  const [assistantVisible, setAssistantVisible] = useState(false)
  useEffect(() => onAssistantClosed(() => setAssistantVisible(false)), [])

  if (assistantVisible) return null

  const handleClick = (action: () => void) => {
    setAssistantVisible(true)
    action()
  }

  return (
    <>
      <button onClick={() => handleClick(() => openNewConversation())}>
        New Chat
      </button>
      <button
        onClick={() =>
          handleClick(() =>
            openNewConversation({ userPrompt: 'What is Scrivito?' }),
          )
        }
      >
        New Chat with user prompt
      </button>
      <button onClick={() => handleClick(resumeConversation)}>
        Resume Chat
      </button>
    </>
  )
}
