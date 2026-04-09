interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Spinner = ({ 
  label, 
  size = 'md', 
  fullScreen = false 
}: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  };

  const content = (
    <div className="flex flex-col items-center gap-4">
      <div 
        className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`} 
      />
      {label && (
        <span className="text-xs font-medium text-gray-500 tracking-widest uppercase animate-pulse">
          {label}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0d1117]">
        {content}
      </div>
    );
  }

  return content;
};
