import { useAuth } from '@/hooks/useAuth'
import { useProjects } from '@/hooks/useProjects'
import { useChat } from '@/hooks/useChat'
import { useDeploy } from '@/hooks/useDeploy'
import { Sidebar } from '@/components/layout/Sidebar'
import { AppShell } from '@/components/layout/AppShell'
import { PanelHeader } from '@/components/layout/PanelHeader'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { FileViewer } from '@/components/code/FileViewer'
import { DeployButton } from '@/components/deploy/DeployButton'
import { PreviewButton } from '@/components/preview/PreviewButton'
import { DeployResultPanel } from '@/components/deploy/DeployResultPanel'

import { Spinner } from '@/components/ui/Spinner'

export default function ChatPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { projects, activeProject, setActiveProject, loading: projectsLoading, creating, create } = useProjects(user?.id ?? '')

  const projectId = activeProject?.id ?? ''

  const { messages, files, loading: chatLoading, historyLoading, send } = useChat(projectId)
  const { result, loading: deployLoading, error: deployError, deploy } = useDeploy()

  if (authLoading || projectsLoading) {
    return (
      <Spinner 
        fullScreen 
        label={authLoading ? 'Authenticating' : 'Loading Projects'} 
      />
    )
  }

  return (
    <div className="flex h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden">
      <Sidebar 
        projects={projects}
        activeProject={activeProject}
        onSelectProject={setActiveProject}
        onCreateProject={create}
        creating={creating}
        user={user}
        onSignOut={signOut}
      />
      <div className="flex-1 min-w-0">
        <AppShell
          leftPanel={
            <>
              <PanelHeader 
                title="Craftly" 
                rightSlot={
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                    <span className="text-xs text-[#8b949e]">live</span>
                  </div>
                }
              />
              {projectId ? (
                <>
                  <ChatWindow messages={messages} loading={chatLoading || historyLoading} />
                  <ChatInput onSend={send} disabled={chatLoading} />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-sm text-[#8b949e]">
                  Create or select a project to start
                </div>
              )}
            </>
          }
          rightPanel={
            <div className="flex flex-col h-full overflow-hidden w-full">
              <PanelHeader 
                title="Code Viewer"
                rightSlot={
                  <div className="flex items-center gap-3 shrink-0">
                    {files && files.length > 0 && (
                      <>
                        <PreviewButton projectId={projectId} />
                        <DeployButton
                          onDeploy={() => deploy(projectId)}
                          loading={deployLoading}
                          deployed={!!result}
                          error={deployError}
                        />
                        <span className="text-[10px] text-[#8b949e] font-mono bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d] hidden sm:block">
                          {files.length} FILES
                        </span>
                      </>
                    )}
                  </div>
                }
              />
              <div className="flex-1 overflow-hidden flex flex-col">
                <FileViewer files={files || []} />
              </div>
              {result && <DeployResultPanel result={result} />}
            </div>
          }
        />
      </div>
    </div>
  )
}
