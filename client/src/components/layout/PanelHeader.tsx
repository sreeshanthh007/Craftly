import React from 'react';

interface PanelHeaderProps {
  title: string;
  rightSlot?: React.ReactNode;
}

export function PanelHeader({ title, rightSlot }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#30363d] bg-[#161b22] shrink-0">
      <h2 className="text-sm font-medium text-[#e6edf3]">{title}</h2>
      {rightSlot}
    </div>
  );
}
