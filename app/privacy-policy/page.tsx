import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — DoorStep Diva',
  description:
    'Learn how DoorStep Diva collects, uses, and protects your personal information when you book our at-home beauty services across Delhi NCR, Lucknow, and Ayodhya.',
}

const LAST_UPDATED = 'April 2025'

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: [
      'When you book a service or enquire with us, we collect the following information:',
      [
        'Name and contact number (required for booking confirmation)',
        'WhatsApp number (used to coordinate your appointment)',
        'Email address (optional — only if you provide it)',
        'Service address / location (so we can send your artist)',
        'Service preferences and any special requests you share with us',
      ],
      'We do not collect payment card details. All payments are made directly to the artist in cash or via UPI at the time of service.',
    ],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    body: [
      'Your information is used solely to provide and improve our services:',
      [
        'To confirm and coordinate your booking with the assigned artist',
        'To send appointment reminders or follow-up messages via WhatsApp',
        'To respond to your enquiries or service requests',
        'To improve our service quality based on your feedback',
        'To contact you about offers or updates if you have opted in',
      ],
      'We never sell, rent, or trade your personal data to any third party for marketing purposes.',
    ],
  },
  {
    id: 'whatsapp-and-communications',
    title: 'WhatsApp & Communications',
    body: [
      'Our primary communication channel is WhatsApp. By messaging us or providing your number for a booking, you consent to receiving booking-related messages from us on that number.',
      'You can opt out of promotional messages at any time by replying "STOP" or simply telling us you do not wish to receive further updates.',
    ],
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    body: [
      'We may share your name, contact number, and service address with the certified artist assigned to your booking. This is strictly to enable them to reach you for the appointment.',
      'We do not share your information with advertisers, data brokers, or any unrelated third parties.',
      'In rare cases where required by law, we may disclose information to relevant authorities.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: [
      'We retain your information for as long as needed to provide our services and handle any follow-up enquiries. If you would like your data removed from our records, you can request deletion at any time by contacting us via WhatsApp or email.',
    ],
  },
  {
    id: 'cookies-and-website',
    title: 'Cookies & Website',
    body: [
      'Our website (doorstepdiva.com) may use basic analytics tools to understand how visitors use the site — such as which pages are visited most. This data is aggregated and does not identify individual users.',
      'We do not use advertising cookies or sell browsing data.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    body: [
      'Our services are intended for adults (18+) or minors accompanied by a parent or guardian. We do not knowingly collect personal information from anyone under the age of 13. If you believe we have inadvertently collected such data, please contact us immediately.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: [
      'You have the right to:',
      [
        'Access the personal information we hold about you',
        'Request correction of inaccurate data',
        'Request deletion of your data',
        'Withdraw consent for communications at any time',
      ],
      'To exercise any of these rights, contact us via WhatsApp at +91 79851 83449.',
    ],
  },
  {
    id: 'changes-to-this-policy',
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date. Continued use of our services after changes are posted constitutes your acceptance of the updated policy.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    body: [
      'If you have any questions or concerns about this Privacy Policy or how we handle your data, please reach out:',
      [
        'WhatsApp: +91 79851 83449',
        'Instagram: @doorstepdivaa',
        'Website: doorstepdiva.com',
      ],
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FBF7F4' }}>

      {/* ── Hero ── */}
      <section
        className="relative py-20 px-5 sm:px-8 md:px-16 overflow-hidden"
        style={{ background: '#3D2B2B' }}
      >
        {/* Glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#C4768A', filter: 'blur(80px)' }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-poppins text-[10px] font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: '#C4768A' }}>
            Legal
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="font-poppins text-sm leading-relaxed mb-2"
            style={{ color: 'rgba(239,204,212,0.60)' }}>
            Last updated: {LAST_UPDATED}
          </p>
          <p className="font-poppins text-sm leading-relaxed max-w-lg"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            DoorStep Diva is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights.
          </p>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="px-5 sm:px-8 md:px-16 py-10 border-b" style={{ borderColor: 'rgba(196,118,138,0.15)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: '#C4768A' }}>
            Contents
          </p>
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="font-poppins text-sm transition-colors hover:text-rose"
                  style={{ color: '#7A5C5C' }}
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="px-5 sm:px-8 md:px-16 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {SECTIONS.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-32">
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-poppins text-[10px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)' }}
                >
                  {i + 1}
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: '#3D2B2B' }}>
                  {s.title}
                </h2>
              </div>

              {/* Section body */}
              <div className="flex flex-col gap-3 pl-10">
                {s.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="flex flex-col gap-2">
                      {block.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C4768A' }} />
                          <span className="font-poppins text-sm leading-relaxed" style={{ color: '#7A5C5C' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className="font-poppins text-sm leading-relaxed" style={{ color: '#7A5C5C' }}>
                      {block}
                    </p>
                  )
                )}
              </div>

              {/* Divider */}
              {i < SECTIONS.length - 1 && (
                <div className="mt-12 h-px" style={{ background: 'rgba(196,118,138,0.15)' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section
        className="mx-5 sm:mx-8 md:mx-16 mb-16 rounded-2xl px-8 py-10 text-center"
        style={{ background: '#3D2B2B' }}
      >
        <p className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: '#C4768A' }}>
          Questions?
        </p>
        <h3 className="font-playfair text-2xl font-bold text-white mb-3">
          We&apos;re always happy to help.
        </h3>
        <p className="font-poppins text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Reach out on WhatsApp and we&apos;ll respond within a few hours.
        </p>
        <a
          href="https://wa.me/917985183449"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
          style={{ background: '#25D366' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
        <div className="mt-6">
          <Link
            href="/"
            className="font-poppins text-xs transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            ← Back to Home
          </Link>
        </div>
      </section>

    </div>
  )
}