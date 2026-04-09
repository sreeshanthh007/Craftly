
export function TypingIndicator() {
  return (
    <div className="self-start flex items-center gap-1 px-3 py-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8b949e] animate-bounce delay-0" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#8b949e] animate-bounce delay-100 [animation-delay:100ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#8b949e] animate-bounce delay-200 [animation-delay:200ms]" />
    </div>
  );
}
