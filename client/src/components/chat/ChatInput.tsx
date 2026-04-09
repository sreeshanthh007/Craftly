import React, { useState, useRef, type KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.trim() && !disabled) {
        onSend(content.trim());
        setContent('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'; // Reset height after sending
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`; // Max ~5 rows
    }
  };

  return (
    <div className="flex gap-2 items-end p-3 border-t border-[#30363d] shrink-0">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 resize-none bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:border-[#1f6feb] transition-colors disabled:opacity-50"
        placeholder="Describe your app or ask anything..."
        rows={1}
        style={{ minHeight: '38px', maxHeight: '120px' }}
      />
      <button
        onClick={() => {
          if (content.trim() && !disabled) {
            onSend(content.trim());
            setContent('');
            if (textareaRef.current) {
              textareaRef.current.style.height = 'auto';
            }
          }
        }}
        disabled={disabled || !content.trim()}
        className="bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
      >
        Send
      </button>
    </div>
  );
}
