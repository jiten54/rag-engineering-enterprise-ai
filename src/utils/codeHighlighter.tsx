import React from 'react';

/**
 * Lightweight, zero-dependency token highlighter for Python, Bash, JSON, and XML code snippets.
 * Ensures zero hydration mismatches and zero external bundle overhead on Vercel.
 */
export function renderHighlightedCode(code: string, language: string = 'python'): React.ReactNode {
  const lines = code.split('\n');

  return (
    <div className="font-mono text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, lineIdx) => {
        return (
          <div key={lineIdx} className="table-row hover:bg-slate-800/40 transition-colors">
            {/* Line Number */}
            <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-[11px] w-8">
              {lineIdx + 1}
            </span>
            {/* Line Content */}
            <span className="table-cell whitespace-pre">
              {highlightLine(line, language)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function highlightLine(line: string, language: string): React.ReactNode {
  if (language === 'python') {
    return highlightPythonLine(line);
  }
  if (language === 'bash' || language === 'shell' || language === 'sh') {
    return highlightBashLine(line);
  }
  if (language === 'json') {
    return highlightJsonLine(line);
  }
  return <span className="text-slate-300">{line}</span>;
}

function highlightPythonLine(line: string): React.ReactNode {
  // Check for full line comments
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Tokenize line using regex capturing groups
  const parts: React.ReactNode[] = [];
  // Token types: Comments, Strings, Decorators, Keywords, Builtins, Numbers
  const regex = /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@\w+)|(\b(?:def|class|import|from|return|if|elif|else|for|while|try|except|finally|raise|with|as|in|is|not|and|or|yield|async|await|pass|lambda|None|True|False)\b)|(\b(?:int|float|str|bool|list|dict|set|tuple|self|cls|super|len|range|print|type|isinstance)\b)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*(?=\s*\())/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    const [fullMatch, comment, str, decorator, keyword, builtin, number, funcCall] = match;
    const startIndex = match.index;

    // Plain text before the match
    if (startIndex > lastIndex) {
      parts.push(
        <span key={lastIndex} className="text-slate-300">
          {line.substring(lastIndex, startIndex)}
        </span>
      );
    }

    if (comment) {
      parts.push(<span key={startIndex} className="text-slate-500 italic">{comment}</span>);
    } else if (str) {
      parts.push(<span key={startIndex} className="text-emerald-400">{str}</span>);
    } else if (decorator) {
      parts.push(<span key={startIndex} className="text-amber-400 font-semibold">{decorator}</span>);
    } else if (keyword) {
      parts.push(<span key={startIndex} className="text-purple-400 font-semibold">{keyword}</span>);
    } else if (builtin) {
      parts.push(<span key={startIndex} className="text-cyan-400">{builtin}</span>);
    } else if (number) {
      parts.push(<span key={startIndex} className="text-orange-300 font-mono">{number}</span>);
    } else if (funcCall) {
      parts.push(<span key={startIndex} className="text-blue-300 font-medium">{funcCall}</span>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={lastIndex} className="text-slate-300">
        {line.substring(lastIndex)}
      </span>
    );
  }

  return parts.length > 0 ? <>{parts}</> : <span className="text-slate-300">{line}</span>;
}

function highlightBashLine(line: string): React.ReactNode {
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  if (trimmed.startsWith('$') || trimmed.startsWith('curl') || trimmed.startsWith('pytest') || trimmed.startsWith('uvicorn') || trimmed.startsWith('python') || trimmed.startsWith('pip')) {
    return (
      <>
        <span className="text-emerald-400 font-bold">{line.split(' ')[0]} </span>
        <span className="text-slate-300">{line.substring(line.indexOf(' ') + 1)}</span>
      </>
    );
  }
  return <span className="text-slate-300">{line}</span>;
}

function highlightJsonLine(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|(\b(?:true|false|null)\b)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    const [_, key, strVal, numVal, boolVal] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      parts.push(
        <span key={lastIndex} className="text-slate-400">
          {line.substring(lastIndex, startIndex)}
        </span>
      );
    }

    if (key) {
      parts.push(<span key={startIndex} className="text-blue-300 font-semibold">{key}</span>);
    } else if (strVal) {
      parts.push(<span key={startIndex} className="text-emerald-300">{strVal}</span>);
    } else if (numVal) {
      parts.push(<span key={startIndex} className="text-orange-300">{numVal}</span>);
    } else if (boolVal) {
      parts.push(<span key={startIndex} className="text-purple-300 font-semibold">{boolVal}</span>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={lastIndex} className="text-slate-400">
        {line.substring(lastIndex)}
      </span>
    );
  }

  return parts.length > 0 ? <>{parts}</> : <span className="text-slate-400">{line}</span>;
}
