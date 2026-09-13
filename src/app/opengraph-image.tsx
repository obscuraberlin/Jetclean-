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
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="100" height="73" viewBox="0 0 300 220">
          <path
            fill="#f0851a"
            d="M12 154C50 128 100 130 155 165C195 190 235 188 262 168C236 200 176 206 124 182C88 165 48 156 12 154Z"
          />
          <rect x="121" y="70" width="16" height="76" fill="#111111" />
          <rect x="253" y="70" width="16" height="84" fill="#111111" />
          <path fill="#111111" d="M80 92L193 6L298 92H278L193 27L100 92Z" />
          <path d="M173 92V72a20 20 0 0 1 40 0v20Z" fill="#f26f11" />
          <rect x="191" y="52" width="4" height="40" fill="#ffffff" />
          <rect x="173" y="72" width="40" height="4" fill="#ffffff" />
          <path fill="#7cb82f" d="M192 186C178 150 204 100 283 80C287 132 250 180 192 186Z" />
          <path
            d="M196 180C220 140 248 110 278 86"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1, color: '#ee6f12' }}>
            JETCLEAN
          </div>
          <div style={{ fontSize: 15, letterSpacing: 6, color: '#111111' }}>
            GEBÄUDESERVICE GMBH
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: 26,
            color: '#c2410c',
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
