import type { DeployResult } from '@/shared/types/index'

interface DeployResultPanelProps {
  result: DeployResult
}

export const DeployResultPanel = ({ result }: DeployResultPanelProps) => {
  return (
    <div className="flex flex-col gap-3 p-4 border-t border-[#30363d] bg-[#161b22]">

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
        <h3 className="text-sm font-medium text-[#e6edf3]">Live deployment</h3>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-2 rounded bg-[#21262d] border border-[#30363d]">
          <span className="text-xs font-medium text-[#8b949e]">Frontend</span>
          <a href={result.frontendUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#1f6feb] hover:underline truncate ml-4 text-right">
            {result.frontendUrl}
          </a>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-[#21262d] border border-[#30363d]">
          <span className="text-xs font-medium text-[#8b949e]">Backend</span>
          <a href={result.backendUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#1f6feb] hover:underline truncate ml-4 text-right">
            {result.backendUrl}
          </a>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-[#21262d] border border-[#30363d]">
          <span className="text-xs font-medium text-[#8b949e]">GitHub</span>
          <a href={result.repoUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#1f6feb] hover:underline truncate ml-4 text-right">
            {result.repoUrl}
          </a>
        </div>

      </div>

    </div>
  )
}
