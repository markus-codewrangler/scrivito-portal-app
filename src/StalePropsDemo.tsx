import { useEffect, useState } from 'react'
import { connect, Obj } from 'scrivito'

function LoadingComponent({ counter }: { counter: number }) {
  console.log('LoadingComponent rendered with counter:', counter)
  return null
}

function MainComponent({ counter }: { counter: number }) {
  console.log('MainComponent rendered with counter:', counter)
  // trigger loading
  Obj.onAllSites().all().first()
  return null
}

const ConnectedComponent = connect(MainComponent, {
  loading: LoadingComponent,
})

export function StalePropsDemo() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCounter((c) => c + 1), 50)
    if (counter > 20) clearInterval(interval)

    return () => clearInterval(interval)
  }, [counter])

  return <ConnectedComponent counter={counter} />
}
