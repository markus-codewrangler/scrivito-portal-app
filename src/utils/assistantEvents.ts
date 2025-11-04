type Listener = () => void

let listener: Listener | null = null

export function onAssistantClosed(cb: Listener) {
  listener = cb
}

export function notifyAssistantClosed() {
  listener?.()
}
