import React from 'react';

interface AppShellProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function AppShell({ leftPanel, rightPanel }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0f1117]">
      <div className="w-1/2 border-r border-[#30363d] flex flex-col">
        {leftPanel}
      </div>
      <div className="w-1/2 flex flex-col">
        {rightPanel}
      </div>
    </div>
  );
}
