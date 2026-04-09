import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Project } from '@/shared/types'
import type { User } from '@supabase/supabase-js'

interface SidebarProps {
  projects: Project[]
  activeProject: Project | null
  onSelectProject: (project: Project) => void
  onCreateProject: (name: string) => void
  creating: boolean
  user: User | null
  onSignOut: () => void
}

export const Sidebar = ({
  projects, activeProject, onSelectProject, onCreateProject, creating, user, onSignOut
}: SidebarProps) => {
  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState('')

  const handleCreate = () => {
    if (!name.trim()) return
    onCreateProject(name.trim())
    setName('')
    setShowInput(false)
  }

  return (
    <div className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-4 border-b border-[#30363d]">
        <h1 className="font-semibold text-[#c9d1d9] text-base font-inter">Craftly</h1>
        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-[#1f6feb]/10 text-[#58a6ff] border border-[#1f6feb]/20">
          AI
        </span>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Projects</h2>
          <button 
            onClick={() => setShowInput(true)}
            className="text-[#8b949e] hover:text-[#e6edf3] text-lg leading-none transition-colors"
            title="New project"
          >
            +
          </button>
        </div>

        {showInput && (
          <div className="mb-4">
            <input 
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCreate()
                if (e.key === 'Escape') { setShowInput(false); setName('') }
              }}
              placeholder="Project name..."
              className="w-full bg-[#21262d] border border-[#30363d] rounded px-2 py-1 text-xs text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:border-[#1f6feb]"
            />
            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleCreate} disabled={creating}
                className="flex-1 text-[10px] py-1 rounded bg-[#238636] text-white hover:bg-[#2ea043] transition-colors disabled:opacity-50"
              >
                {creating ? '...' : 'Create'}
              </button>
              <button 
                onClick={() => { setShowInput(false); setName('') }}
                className="flex-1 text-[10px] py-1 rounded bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={cn(
                'w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center gap-2 truncate',
                activeProject?.id === project.id
                  ? 'bg-[#1f6feb]/10 text-[#58a6ff]'
                  : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
              {project.name}
            </button>
          ))}

          {projects.length === 0 && !showInput && (
            <div className="text-xs text-[#8b949e] text-center mt-8 italic">
              No projects yet
            </div>
          )}
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-[#30363d] bg-[#161b22]/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center text-[10px] font-bold text-[#c9d1d9] shrink-0 overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Profile" />
              ) : (
                user?.email?.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-[#c9d1d9] truncate">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
              </span>
              <span className="text-[9px] text-[#8b949e] truncate">{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={onSignOut}
            className="p-1.5 text-[#8b949e] hover:text-[#f85149] hover:bg-[#f85149]/10 rounded transition-colors"
            title="Sign out"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
