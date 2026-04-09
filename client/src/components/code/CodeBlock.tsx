

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const lines = code.split('\n');

  return (
    <div className="overflow-auto h-full w-full bg-[#0f1117]">
      <pre className="font-mono text-xs leading-relaxed p-4 bg-[#0f1117] h-full m-0">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-[#484f58] select-none mr-4 text-right w-6 shrink-0">
              {index + 1}
            </span>
            <span className="text-[#c9d1d9] whitespace-pre">{line || ' '}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
