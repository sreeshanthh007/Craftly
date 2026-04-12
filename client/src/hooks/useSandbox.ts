import { useState } from 'react'
import { startSandbox, stopSandbox } from '@services/sandboxService'
import type { SandboxStatus, SandboxResult } from '@shared/types'

export const useSandbox = (projectId: string) => {
  const [status, setStatus] = useState<SandboxStatus>('idle')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startPreview = async () => {
    try {
      setStatus('starting')
      setError(null)
      const result = await startSandbox(projectId)
      setPreviewUrl(result.previewUrl)
      setStatus('running')
    } catch (err: any) {
      console.error('Failed to start sandbox:', err)
      setError(err.response?.data?.message || err.message || 'Failed to start sandbox')
      setStatus('error')
    }
  }

  const stopPreview = async () => {
    try {
      await stopSandbox(projectId)
      setPreviewUrl(null)
      setStatus('stopped')
    } catch (err: any) {
      console.error('Failed to stop sandbox:', err)
      setError(err.message)
    }
  }

  return { 
    status, 
    previewUrl, 
    startPreview, 
    stopPreview, 
    error 
  }
}
