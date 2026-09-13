'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
          padding: '4rem 1.5rem',
          textAlign: 'center',
          color: '#0b1329',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Da ist etwas schiefgelaufen.</h1>
        <p style={{ color: '#5b6b85', marginBottom: '2rem' }}>
          Bitte laden Sie die Seite neu oder versuchen Sie es später erneut.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#ee6212',
            color: '#fff',
            border: 0,
            borderRadius: 999,
            padding: '0.85rem 1.5rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Erneut versuchen
        </button>
      </body>
    </html>
  );
}
