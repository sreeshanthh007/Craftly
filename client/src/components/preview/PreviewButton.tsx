import React, { useEffect } from 'react';
import { useSandbox } from '@/hooks/useSandbox';
import { Spinner } from '@/components/ui/Spinner';

interface PreviewButtonProps {
  projectId: string;
}

export const PreviewButton: React.FC<PreviewButtonProps> = ({ projectId }) => {
  const { status, previewUrl, startPreview, error } = useSandbox(projectId);

  useEffect(() => {
    if (status === 'running' && previewUrl) {
      window.open(previewUrl, '_blank');
    }
  }, [status, previewUrl]);

  const getLabel = () => {
    switch (status) {
      case 'starting':
        return 'Launching...';
      case 'running':
        return 'Open Preview';
      case 'error':
        return 'Retry Preview';
      default:
        return 'Preview';
    }
  };

  const handleClick = () => {
    if (status === 'running' && previewUrl) {
      window.open(previewUrl, '_blank');
    } else {
      startPreview();
    }
  };

  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <button
        onClick={handleClick}
        disabled={status === 'starting'}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          status === 'running'
            ? 'bg-[#238636] hover:bg-[#2ea043] text-white shadow-lg'
            : status === 'error'
            ? 'bg-[#da3633] hover:bg-[#f85149] text-white'
            : 'bg-[#1f6feb] hover:bg-[#388bfd] text-white border border-[#1f6feb] shadow-md'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === 'starting' && <Spinner size="sm" />}
        <span>{getLabel()}</span>
      </button>
      {error && (
        <span className="text-[10px] text-[#f85149] max-w-[200px] text-right leading-tight">
          {error}
        </span>
      )}
    </div>
  );
};
