import { useRef, useState, type ReactNode } from 'react';

function CopyableTable({ children, ...props }: { children?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const table = wrapRef.current?.querySelector('table');
    if (!table) return;

    // Build TSV: tabs between cells, newlines between rows
    const tsv = Array.from(table.rows)
      .map((row) =>
        Array.from(row.cells)
          .map((cell) => (cell.innerText ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' ').trim())
          .join('\t')
      )
      .join('\n');

    // HTML flavor preserves structure for Sheets/Word/email
    const html = table.outerHTML;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': new Blob([tsv], { type: 'text/plain' }),
            'text/html': new Blob([html], { type: 'text/html' }),
          }),
        ]);
      } else {
        // Fallback for older browsers
        await navigator.clipboard.writeText(tsv);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Table copy failed', err);
    }
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative' }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget.querySelector('button');
        if (btn) btn.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget.querySelector('button');
        if (btn) btn.style.opacity = '0';
      }}
    >
      <button
        type="button"
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          opacity: 0,
          transition: 'opacity 0.15s',
          fontSize: 12,
          padding: '2px 8px',
          border: '1px solid #d0d7de',
          borderRadius: 4,
          background: '#fff',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        {copied ? '✓ Copied' : '⧉ Copy for Excel'}
      </button>
      <table {...props}>{children}</table>
    </div>
  );
}
