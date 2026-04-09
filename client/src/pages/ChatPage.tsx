import { useChat } from '@/hooks/useChat'
import { useDeploy } from '@/hooks/useDeploy'
import { AppShell } from '@/components/layout/AppShell'
import { PanelHeader } from '@/components/layout/PanelHeader'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { FileViewer } from '@/components/code/FileViewer'
import { DeployButton } from '@/components/deploy/DeployButton'
import { DeployResultPanel } from '@/components/deploy/DeployResultPanel'

const PROJECT_ID = 'demo-project-1'

export default function ChatPage() {
  const { messages, files, loading, send } = useChat(PROJECT_ID)
  const { result, loading: deployLoading, error: deployError, deploy } = useDeploy()

  return (
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
          <ChatWindow messages={messages} loading={loading} />
          <ChatInput onSend={send} disabled={loading} />
        </>
      }
      rightPanel={
        <div className="flex flex-col h-full overflow-hidden w-full">
          <PanelHeader 
            title="Code Viewer"
            rightSlot={
              <div className="flex items-center gap-3">
                {files && files.length > 0 && (
                  <span className="text-xs text-[#8b949e]">{files.length} files</span>
                )}
                {files && files.length > 0 && (
                  <DeployButton
                    onDeploy={() => deploy(PROJECT_ID)}
                    loading={deployLoading}
                    deployed={!!result}
                    error={deployError}
                  />
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
  )
}
