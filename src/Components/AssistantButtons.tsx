import {
  openNewConversation,
  resumeConversation,
  useAssistantVisible,
} from '@justrelate/ai-assistant'

export function AssistantButtons() {
  if (useAssistantVisible()) return null

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
