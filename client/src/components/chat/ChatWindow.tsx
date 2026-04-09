import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export function ChatWindow({ messages, loading }: ChatWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#484f58] text-sm p-4">
        Describe an app and Craftly will build it for you
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-2 overflow-y-auto flex-1 p-4">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}
