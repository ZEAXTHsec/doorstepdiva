import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Returns & Refund Policy — DoorStep Diva',
  description:
    'Understand our cancellation, rescheduling, and refund policy for at-home beauty services across Delhi NCR, Lucknow, and Ayodhya.',
}

const LAST_UPDATED = 'May 2026'

const SECTIONS = [
  {
    id: 'cancellation-policy',
    title: 'Cancellation Policy',
    body: [
      'We understand that plans can change. Our cancellation policy is designed to be fair to both you and our artists:',
      [
        'Free cancellation up to 24 hours before your scheduled appointment.',
        'Cancellations made between 6–24 hours before the appointment will incur a 50% charge of the booking amount.',
        'Cancellations made less than 6 hours before the appointment will incur a 100% charge.',
        'No-show appointments (artist arrives and client is unreachable) will be charged in full.',
      ],
      'To cancel or reschedule, message us on WhatsApp at +91 79851 83449 or reach out via Instagram @doorstepdivaa.',
    ],
  },
  {
    id: 'rescheduling',
    title: 'Rescheduling',
    body: [
      'We offer free rescheduling up to 12 hours before your appointment, subject to artist availability.',
      'If your preferred new slot is unavailable, we will work with you to find the next best available time.',
      'Repeated rescheduling (more than 2 times for the same booking) may result in a nominal rescheduling fee of ₹300 to compensate the artist for blocked calendar time.',
    ],
  },
  {
    id: 'deposit-refunds',
    title: 'Deposits & Refunds',
    body: [
      'For bookings made with a deposit (calendar-off mode):',
      [
        'Deposits are fully refundable if cancelled at least 24 hours before the appointment.',
        'Deposits are 50% refundable if cancelled between 6–24 hours before the appointment.',
        'Deposits are non-refundable for cancellations within 6 hours of the appointment or for no-shows.',
      ],
      'Refunds are processed within 5–7 business days to the original payment method.',
      'For Razorpay/UPI payments, the refund timeline depends on your bank and may take up to 10 business days to reflect in your account.',
    ],
  },
  {
    id: 'service-quality',
    title: 'Service Quality Guarantee',
    body: [
      'We take pride in the quality of our services. If you are unsatisfied with the outcome of your service:',
      [
        'Notify the artist during or immediately after the service — most issues can be resolved on the spot.',
        'If the issue cannot be resolved immediately, contact us within 24 hours of your appointment via WhatsApp.',
        'We will review your concern and offer a complimentary touch-up, partial refund, or credit toward a future booking — decided on a case-by-case basis.',
      ],
      'Please note: makeup, hair, and skin results can vary based on skin type, hair texture, weather conditions, and personal preference. We encourage sharing reference images and having a thorough consultation before the service begins.',
    ],
  },
  {
    id: 'product-and-tools',
    title: 'Products & Tools',
    body: [
      'All products used during your service are professional-grade from trusted brands (MAC, Charlotte Tilbury, NARS, Huda Beauty, Kryolan, L\'Oréal Professionnel, Schwarzkopf, and others).',
      'All tools are sanitized between clients. Disposable applicators are used wherever possible.',
      'If you have known allergies, please inform us at the time of booking so we can patch-test or substitute products accordingly. DoorStep Diva is not liable for allergic reactions to products that we were not informed about in advance.',
    ],
  },
  {
    id: 'travel-and-access',
    title: 'Travel & Access',
    body: [
      'Our artists travel to your location. It is your responsibility to:',
      [
        'Provide accurate address and directions at the time of booking.',
        'Ensure the artist has access to the venue (gated communities, hotels — please arrange entry).',
        'Provide a clean, well-lit space with access to a power outlet for tools.',
        'Ensure parking is available if you are in a restricted-parking zone (any parking charges are the client\'s responsibility).',
      ],
      'If the artist arrives and cannot access your location, or the space is unsuitable for the service, the booking will be treated as a no-show and charged in full.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Questions About This Policy',
    body: [
      'If you have any questions about returns, refunds, or cancellations, reach out:',
      [
        'WhatsApp: +91 79851 83449',
        'Instagram: @doorstepdivaa',
        'Website: doorstepdiva.com',
      ],
    ],
  },
]

export default function ReturnsPage() {
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
            Returns & Refund Policy
          </h1>
          <p className="font-poppins text-sm leading-relaxed mb-2"
            style={{ color: 'rgba(239,204,212,0.60)' }}>
            Last updated: {LAST_UPDATED}
          </p>
          <p className="font-poppins text-sm leading-relaxed max-w-lg"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            Our cancellation, rescheduling, and refund policy — designed to be fair to both you and our artists.
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
          Need to cancel or reschedule?
        </p>
        <h3 className="font-playfair text-2xl font-bold text-white mb-3">
          Message us on WhatsApp.
        </h3>
        <p className="font-poppins text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          We will confirm your cancellation or help find a new slot.
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
