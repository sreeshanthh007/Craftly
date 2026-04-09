import { useState } from 'react'
import { deployProject } from '@/services/deployService'
import type { DeployResult } from '@/shared/types/index'

interface UseDeployReturn {
  result: DeployResult | null
  loading: boolean
  error: string | null
  deploy: (projectId: string) => Promise<void>
  reset: () => void
}

export const useDeploy = (): UseDeployReturn => {
  const [result, setResult] = useState<DeployResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deploy = async (projectId: string) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await deployProject(projectId)
      setResult(res)
    } catch {
      setError('Deployment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setResult(null); setError(null) }

  return { result, loading, error, deploy, reset }
}
