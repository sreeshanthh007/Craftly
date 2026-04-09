import { useState } from 'react'
import { deployProject } from '@services/deployService'
import type { DeployResult } from '@shared/types'

export const useDeploy = () => {
  const [result, setResult] = useState<DeployResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deploy = async (projectId: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await deployProject(projectId)
      setResult(res)
    } catch {
      setError('Deployment failed')
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, deploy }
}
