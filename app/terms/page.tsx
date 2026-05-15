import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions — DoorStep Diva',
  description:
    'Terms and conditions for using DoorStep Diva at-home beauty services across Delhi NCR, Lucknow, and Ayodhya.',
}

const LAST_UPDATED = 'May 2026'

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    body: [
      'By booking a service with DoorStep Diva ("we," "us," "our"), you ("client," "you," "your") agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not book our services.',
      'These terms apply to all services booked through our website (doorstepdiva.com), WhatsApp, phone, or any other channel.',
      'We reserve the right to update these terms at any time. Changes will be posted on this page with a revised date. Continued use of our services after changes are posted constitutes acceptance of the updated terms.',
    ],
  },
  {
    id: 'services',
    title: 'Our Services',
    body: [
      'DoorStep Diva provides at-home beauty services including but not limited to: hair, skin, makeup, nail extensions, eyelash and brow services, and semi-permanent makeup.',
      'All services are performed by certified, trained artists at a location specified by the client (home, hotel, venue, etc.).',
      'Service durations listed on our website are estimates. Actual time may vary based on individual requirements, hair length and thickness, skin type, and other factors.',
      'Service results may vary based on factors beyond our control including skin type, hair texture, weather conditions, and individual physiology.',
    ],
  },
  {
    id: 'booking-and-payment',
    title: 'Booking & Payment',
    body: [
      'Bookings can be made through our website, WhatsApp, or phone.',
      'For calendar-mode bookings: you select a date and time slot. Your booking is confirmed once you receive a confirmation message.',
      'For deposit-mode bookings: a non-refundable deposit (as displayed at the time of booking) is required to secure your slot. The remaining balance is payable directly to the artist at the time of service.',
      'Payment methods accepted: Cash, UPI (GPay, PhonePe, Paytm), and online payment via Razorpay for deposits.',
      'Prices displayed on our website include applicable discounts. Prices are subject to change without notice, but confirmed bookings will be honored at the booked price.',
    ],
  },
  {
    id: 'client-responsibilities',
    title: 'Client Responsibilities',
    body: [
      'As a client, you agree to:',
      [
        'Provide accurate contact information and service address at the time of booking.',
        'Ensure the artist has a clean, safe, and well-lit workspace with access to a power outlet.',
        'Arrange access to gated communities, hotels, or secured buildings.',
        'Inform us of any allergies, skin conditions, sensitivities, or medical concerns before the service begins.',
        'Be present and reachable at the scheduled time. If you are more than 30 minutes late without communication, the artist reserves the right to cancel the booking as a no-show.',
        'Supervise minors (under 18) who are receiving services. A parent or guardian must be present throughout the service.',
        'Arrange parking for the artist if you are in a restricted-parking zone. Parking charges, if any, are the client\'s responsibility.',
      ],
    ],
  },
  {
    id: 'artist-conduct',
    title: 'Artist Conduct & Safety',
    body: [
      'Our artists are trained, certified, and background-verified professionals.',
      'We have a zero-tolerance policy for harassment, abuse, or inappropriate behavior toward our artists. Any such conduct will result in immediate cancellation without refund and may be reported to authorities.',
      'If at any point the artist feels unsafe or uncomfortable, they have the right to leave the premises.',
      'All tools are sanitized between clients. Disposable applicators are used where applicable. We maintain high hygiene standards.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    body: [
      'All content on our website — including text, images, logos, service descriptions, pricing, and design — is the intellectual property of DoorStep Diva.',
      'Before-and-after photos shared by us on social media are shared only with explicit client consent.',
      'You may not reproduce, distribute, or use our content for commercial purposes without written permission.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    body: [
      'DoorStep Diva and its artists are not liable for:',
      [
        'Allergic reactions to products when relevant allergies were not disclosed at the time of booking.',
        'Results that differ from reference images — while we work to achieve your desired look, results vary based on individual features, skin type, and hair texture.',
        'Damage to personal property unless caused by gross negligence on the part of the artist.',
        'Delays caused by traffic, weather, or other circumstances beyond our reasonable control. We will communicate any delays promptly.',
        'Any indirect, incidental, or consequential damages arising from the use of our services.',
      ],
      'Our total liability for any claim arising from a service is limited to the amount paid for that specific service.',
    ],
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    body: [
      'If you have a concern, we encourage you to contact us directly first — most issues can be resolved quickly.',
      'Any disputes that cannot be resolved informally shall be subject to the jurisdiction of courts in Delhi, India.',
      'These terms are governed by the laws of the Republic of India.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    body: [
      'For questions about these Terms & Conditions, or to report a concern:',
      [
        'WhatsApp: +91 79851 83449',
        'Instagram: @doorstepdivaa',
        'Website: doorstepdiva.com',
      ],
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FBF7F4' }}>

      <section
        className="relative py-20 px-5 sm:px-8 md:px-16 overflow-hidden"
        style={{ background: '#3D2B2B' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#C4768A', filter: 'blur(80px)' }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-poppins text-[10px] font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: '#C4768A' }}>
            Legal
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Terms & Conditions
          </h1>
          <p className="font-poppins text-sm leading-relaxed mb-2"
            style={{ color: 'rgba(239,204,212,0.60)' }}>
            Last updated: {LAST_UPDATED}
          </p>
          <p className="font-poppins text-sm leading-relaxed max-w-lg"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            Please read these terms carefully before booking our services. By booking, you agree to be bound by these conditions.
          </p>
        </div>
      </section>

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

      <section className="px-5 sm:px-8 md:px-16 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {SECTIONS.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-32">
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

              {i < SECTIONS.length - 1 && (
                <div className="mt-12 h-px" style={{ background: 'rgba(196,118,138,0.15)' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-5 sm:mx-8 md:mx-16 mb-16 rounded-2xl px-8 py-10 text-center"
        style={{ background: '#3D2B2B' }}
      >
        <p className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: '#C4768A' }}>
          Questions?
        </p>
        <h3 className="font-playfair text-2xl font-bold text-white mb-3">
          We are happy to clarify.
        </h3>
        <p className="font-poppins text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          If anything in these terms is unclear, reach out on WhatsApp and we will explain.
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
