import { ImageResponse } from 'next/og';
import { company } from '@/content/company';

export const alt = `${company.name} – Gebäudereinigung in Berlin`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: 'linear-gradient(135deg, #ffffff 0%, #f6f7f9 100%)',
        color: '#0b1329',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="64" height="64" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" rx="11" fill="#0b1329" />
          <path
            d="M11 20.5 20 12l9 8.5"
            fill="none"
            stroke="#ee6212"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 19v8.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V19"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m16.75 23.5 2.3 2.3 4.5-4.6"
            fill="none"
            stroke="#ee6212"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 800, letterSpacing: -1.5 }}>
          JET<span style={{ color: '#ee6212' }}>CLEAN</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: 26,
            color: '#dd5711',
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          {`Seit über ${company.yearsOfExperience} Jahren in Berlin`}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
          }}
        >
          <span>Gebäudereinigung für Berliner Unternehmen,</span>
          <span style={{ color: '#ee6212' }}>auf die Sie sich verlassen können.</span>
        </div>
        <div style={{ fontSize: 28, color: '#5b6b85' }}>{company.tagline}</div>
      </div>
    </div>,
    { ...size },
  );
}
