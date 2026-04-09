import { cn } from '@/lib/utils'

interface DeployButtonProps {
  onDeploy: () => void
  loading: boolean
  deployed: boolean
  error: string | null
}

export const DeployButton = ({ onDeploy, loading, deployed, error }: DeployButtonProps) => {
  return (
    <button
      onClick={onDeploy}
      disabled={loading || deployed}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
        loading || (!deployed && !error) ? "bg-[#1f6feb] hover:bg-[#388bfd] border-[#1f6feb] text-white disabled:opacity-50 disabled:hover:bg-[#1f6feb]" : "",
        deployed && !loading ? "bg-[#21262d] border-[#30363d] text-[#3fb950] disabled:opacity-100" : "",
        error ? "bg-[#ff7b72] hover:bg-[#ff7b72]/90 border-[#ff7b72] text-white" : ""
      )}
    >
      {loading && <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
      {deployed && !loading && <span>✓</span>}
      {!loading && !deployed && <span>↑</span>}
      
      <span>
        {loading ? 'Deploying...' : deployed ? 'Deployed' : error ? 'Retry deploy' : 'Deploy app'}
      </span>
    </button>
  )
}
