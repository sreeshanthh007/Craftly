import { useState } from 'react'
import { startSandbox, stopSandbox } from '@services/sandboxService'
import type { SandboxResult } from '@shared/types'

export const useSandbox = () => {
  const [sandbox, setSandbox] = useState<SandboxResult | null>(null)
  const [loading, setLoading] = useState(false)

  const start = async (projectId: string) => {
    setLoading(true)
    const result = await startSandbox(projectId)
    setSandbox(result)
    setLoading(false)
  }

  const stop = async () => {
    if (!sandbox) return
    await stopSandbox(sandbox.containerId)
    setSandbox(null)
  }

  return { sandbox, loading, start, stop }
}
