import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

import { CodeBlock } from './CodeBlock';

interface File {
  path: string;
  content: string;
  language?: string;
}

interface FileViewerProps {
  files: File[];
}

export function FileViewer({ files }: FileViewerProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    setSelectedTabIndex(0);
  }, [files]);

  if (!files || files.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8b949e] mb-2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span className="text-[#8b949e] text-sm font-medium">No files yet</span>
        <span className="text-[#484f58] text-xs">Generated files will appear here after your first build</span>
      </div>
    );
  }

  const selectedFile = files[selectedTabIndex];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex border-b border-[#30363d] bg-[#161b22] overflow-x-auto shrink-0 select-none">
        {files.map((file, index) => {
          const filename = file.path.split('/').pop() || file.path;
          const isActive = index === selectedTabIndex;
          return (
            <div
              key={index}
              onClick={() => setSelectedTabIndex(index)}
              className={cn(
                "px-3 py-1.5 text-xs cursor-pointer shrink-0 transition-colors border-r border-[#30363d]",
                isActive
                  ? "text-[#e6edf3] border-b-2 border-b-[#1f6feb] bg-[#0f1117]"
                  : "text-[#8b949e] hover:text-[#c9d1d9]"
              )}
            >
              {filename}
            </div>
          );
        })}
      </div>
      <div className="flex-1 overflow-hidden h-full">
        {selectedFile && (
          <CodeBlock code={selectedFile.content} language={selectedFile.language} />
        )}
      </div>
    </div>
  );
}
