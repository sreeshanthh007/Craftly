import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  const isSuccess = !isUser && message.content.startsWith('✓');
  const isError = !isUser && (message.content.startsWith('✗') || message.content.startsWith('Error'));

  return (
    <div
      className={cn(
        "px-3 py-2 text-sm",
        isUser
          ? "self-end max-w-[85%] rounded-lg rounded-br-sm bg-[#1f6feb] text-[#e6edf3]"
          : "self-start max-w-[90%] rounded-lg rounded-bl-sm bg-[#21262d] text-[#c9d1d9] border border-[#30363d]",
        isSuccess && "border-l-2 border-[#3fb950]",
        isError && "border-l-2 border-[#ff7b72]"
      )}
    >
      <div className="whitespace-pre-wrap">{message.content}</div>
    </div>
  );
}
