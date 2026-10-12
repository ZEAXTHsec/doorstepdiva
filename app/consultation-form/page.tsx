'use client'

import React, { useState } from 'react'

type FormCategory = 'skin' | 'hair' | 'bridal' | 'nails' | 'semi-permanent'

export default function ConsultationFormPage() {
  const [activeCategory, setActiveCategory] = useState<FormCategory>('skin')

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#F5F2F0] py-8 px-4 font-poppins text-stone">
      {/* ─── SCREEN CONTROLS (HIDDEN ON PRINT) ─── */}
      <div className="no-print max-w-4xl mx-auto mb-8 bg-white rounded-2xl p-6 shadow-md border border-[#8B3A52]/15">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5 pb-5 border-b border-stone/10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8B3A52]">
              Physical Print Studio · DoorStep Diva
            </p>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D2B2B]">
              Client Consultation & Consent Forms
            </h1>
            <p className="text-xs text-stone/70 mt-1">
              Select category below, click Print or Save as PDF. Formatted to fit an exact standard single A4 page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B3A52] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#722F43] transition-colors shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print Form (A4)</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'skin', label: 'Skin & Facials / Waxing' },
            { id: 'hair', label: 'Hair & Chemical Treatments' },
            { id: 'bridal', label: 'Bridal & HD Makeup (Face Chart)' },
            { id: 'nails', label: 'Nails & Extensions' },
            { id: 'semi-permanent', label: 'Semi-Permanent Makeup' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as FormCategory)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#8B3A52] text-white shadow-sm'
                    : 'bg-stone/5 text-stone/70 hover:bg-stone/10 border border-stone/15'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── PRINTABLE A4 CONTAINER ─── */}
      <div className="max-w-[800px] mx-auto bg-white shadow-2xl rounded-none a4-sheet overflow-hidden border border-[#8B3A52]/20">
        <style jsx global>{`
          @media print {
            body {
              background: #ffffff !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .no-print {
              display: none !important;
            }
            .a4-sheet {
              box-shadow: none !important;
              border: 1.5px solid #8B3A52 !important;
              max-width: 100% !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 10mm 12mm !important;
              page-break-after: avoid !important;
              page-break-inside: avoid !important;
              border-radius: 0 !important;
            }
            @page {
              size: A4 portrait;
              margin: 8mm;
            }
          }
        `}</style>

        <div className="p-8 sm:p-10 text-[11px] leading-tight text-[#3D2B2B]">
          {/* Header */}
          <div className="border-b-2 border-[#8B3A52] pb-3 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-playfair text-xl font-bold tracking-wider text-[#8B3A52]">
                    DOORSTEP DIVA
                  </span>
                  <span className="text-[10px] tracking-widest text-[#C8974A] uppercase font-semibold">
                    · LUXURY AT-HOME SALON
                  </span>
                </div>
                <p className="text-[9px] text-stone/70 uppercase tracking-widest font-medium">
                  Gomti Nagar, Lucknow · +91 83539 82888 · mydoorstepdiva.com
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded bg-[#8B3A52] text-white text-[9px] font-bold tracking-wider uppercase">
                  {activeCategory === 'skin' && 'Skin & Facial Consent'}
                  {activeCategory === 'hair' && 'Hair Architecture Intake'}
                  {activeCategory === 'bridal' && 'Bridal Artistry Intake'}
                  {activeCategory === 'nails' && 'Nail Architecture Form'}
                  {activeCategory === 'semi-permanent' && 'Semi-Permanent Consent'}
                </span>
                <p className="text-[9px] text-stone/60 mt-1 font-mono">
                  REF: DSD-{activeCategory.toUpperCase()}-2026
                </p>
              </div>
            </div>
          </div>

          {/* 1. Client & Session Logistics */}
          <div className="mb-4 bg-[#FAF7F5] p-3 rounded-lg border border-[#8B3A52]/15">
            <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-2">
              1. Client & Appointment Logistics
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
              <div>
                <span className="font-semibold text-stone/70">Client Full Name:</span>
                <span className="inline-block w-[60%] border-b border-stone/30 ml-1"></span>
              </div>
              <div>
                <span className="font-semibold text-stone/70">WhatsApp Contact:</span>
                <span className="inline-block w-[60%] border-b border-stone/30 ml-1"></span>
              </div>
              <div>
                <span className="font-semibold text-stone/70">Address / Locality:</span>
                <span className="inline-block w-[60%] border-b border-stone/30 ml-1"></span>
              </div>
              <div>
                <span className="font-semibold text-stone/70">Appointment Date:</span>
                <span className="inline-block w-[60%] border-b border-stone/30 ml-1"></span>
              </div>
              <div>
                <span className="font-semibold text-stone/70">Assigned Artist:</span>
                <span className="inline-block w-[60%] border-b border-stone/30 ml-1"></span>
              </div>
              <div>
                <span className="font-semibold text-[#8B3A52]">Reserved Time Slot:</span>
                <span className="inline-block border-b border-stone/30 ml-1 w-16"></span>
                <span className="text-[9px] text-stone/60"> to </span>
                <span className="inline-block border-b border-stone/30 w-16"></span>
              </div>
            </div>
          </div>

          {/* ─── DYNAMIC CATEGORY CONTENT ─── */}

          {/* CATEGORY 1: SKIN & FACIALS / WAXING */}
          {activeCategory === 'skin' && (
            <>
              {/* Treatment Checklist */}
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  2. Treatments Selected Today (Check all that apply)
                </p>
                <div className="grid grid-cols-3 gap-2 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Signature Deep Cleanse</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Korean Glass Hydration</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Plant Peptide Brightening</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Rica Full Arms & Legs</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Rica Brazilian / Bikini</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Full Body Glow Polish</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Eyebrow / Upper Lip Threading</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Glycolic Detan Mask</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Ultrasonic Comedone Extraction</label>
                </div>
              </div>

              {/* Indian Skin Diagnostic & Sensitivity Checklist */}
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  3. Indian Skin & Sensitivity Diagnostic (Please tick any that apply)
                </p>
                <div className="grid grid-cols-3 gap-2 text-[9.5px] p-2.5 rounded-lg bg-[#FAF7F5] border border-stone/15">
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Bleach / Ammonia Allergy</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Active Cystic Acne / Open Rash</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Melasma / Deep Pigmentation</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Threading Bruise History</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Rica Wax Peeling Sensitivity</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Retinoid / Tretinoin (Past 14 Days)</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Recent Chemical Peel / Laser</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Diabetes / Slow Wound Healing</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Currently Pregnant / Nursing</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Steam / Excessive Heat Flush</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Open Sunburn / Recent Tanning</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Normal / Non-Reactive Skin</label>
                </div>
              </div>

              {/* Technical Prescription Notes */}
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1">
                  4. Technical Formulation & Artist Log
                </p>
                <div className="grid grid-cols-2 gap-3 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <div>
                    <span className="font-semibold text-stone/70">Skin Texture: </span>
                    <span className="text-stone/60">[ ] Dry  [ ] Oily  [ ] Sensitive  [ ] Dehydrated</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Wax Temp Check: </span>
                    <span className="text-stone/60">[ ] Tested on wrist & approved by client</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-stone/70">Formulations & Ampoules Applied: </span>
                    <span className="inline-block w-[65%] border-b border-stone/30"></span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CATEGORY 2: HAIR & CHEMICAL TREATMENTS */}
          {activeCategory === 'hair' && (
            <>
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  2. Hair Chemistry & Diagnostic (Crucial Indian Hair Check)
                </p>
                <div className="grid grid-cols-3 gap-2 text-[9.5px] p-2.5 rounded-lg bg-[#FAF7F5] border border-stone/15">
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Mehendi / Henna (Past 12 Months)</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Metallic / Black Box Dye History</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Keratin / Smoothening (Past 6 Mos)</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Bleach / High-Lift Lightener History</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Severe Hair Fall / Scalp Psoriasis</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Scalp Sensitivity / Dandruff Flakes</label>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  3. Service Plan & Formula Blueprint
                </p>
                <div className="grid grid-cols-2 gap-3 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <div>
                    <span className="font-semibold text-stone/70">Target Result: </span>
                    <span className="text-stone/60">[ ] French Balayage  [ ] Botoplex  [ ] Keratin Rebuild</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Porosity / Elasticity: </span>
                    <span className="text-stone/60">[ ] High  [ ] Medium  [ ] Heat-Compromised</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-stone/70">Formulations & Lightener Levels: </span>
                    <span className="inline-block w-[65%] border-b border-stone/30"></span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CATEGORY 3: BRIDAL & HD MAKEUP */}
          {activeCategory === 'bridal' && (
            <>
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  2. Ceremony & Aesthetic Architecture
                </p>
                <div className="grid grid-cols-3 gap-2 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Haldi / Mehendi Natural</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Sangeet Night Glam</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Royal HD Wedding Day</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Airbrush Waterproof Base</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Traditional Bun / Fresh Flora</label>
                  <label className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-stone/40 inline-block rounded-sm"></span> Reception Editorial Glam</label>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  3. Face Blueprint & Product Specifications
                </p>
                <div className="grid grid-cols-2 gap-3 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <div>
                    <span className="font-semibold text-stone/70">Foundation Shade / Undertone: </span>
                    <span className="inline-block w-[50%] border-b border-stone/30"></span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Lens / Glasses: </span>
                    <span className="text-stone/60">[ ] Contact Lenses Inserted Prior</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Lash Architecture: </span>
                    <span className="text-stone/60">[ ] Natural Demi  [ ] Full Dramatic Flare</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Dupatta & Jewelry Pinning: </span>
                    <span className="text-stone/60">[ ] Single Drape  [ ] Double Veil Locked</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CATEGORY 4: NAILS & EXTENSIONS */}
          {activeCategory === 'nails' && (
            <>
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  2. Nail Plate Health & History
                </p>
                <div className="grid grid-cols-3 gap-2 text-[9.5px] p-2.5 rounded-lg bg-[#FAF7F5] border border-stone/15">
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Thin / Peeling Nail Beds</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Habitual Nail Biting</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Previous Gel Lifting History</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Recent Cuticle Infection / Fungus</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Heavy Daily Water / Chemical Work</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Fresh Mehendi / Henna Stain</label>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  3. System & Architecture Selected
                </p>
                <div className="grid grid-cols-2 gap-3 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <div>
                    <span className="font-semibold text-stone/70">Extension System: </span>
                    <span className="text-stone/60">[ ] Acrylic Full Set  [ ] Gel  [ ] PolyGel</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Shape & Length: </span>
                    <span className="text-stone/60">[ ] Almond  [ ] Square  [ ] Coffin / Medium</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CATEGORY 5: SEMI-PERMANENT MAKEUP */}
          {activeCategory === 'semi-permanent' && (
            <>
              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  2. Strict Medical Contraindication Checklist
                </p>
                <div className="grid grid-cols-3 gap-2 text-[9.5px] p-2.5 rounded-lg bg-[#FAF7F5] border border-stone/15">
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Keloid Scarring Tendency</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Diabetes / High Blood Sugar</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Blood Thinners / Aspirin Use</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Accutane / Isotretinoin (Past 1 Yr)</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Eczema / Psoriasis Near Brows</label>
                  <label className="flex items-center gap-1.5"><span className="w-3 h-3 border border-stone/40 inline-block rounded-sm"></span> Pregnant / Lactating</label>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#8B3A52] mb-1.5">
                  3. Procedure & Pigment Specifications
                </p>
                <div className="grid grid-cols-2 gap-3 text-[10px] p-2.5 rounded-lg border border-stone/15">
                  <div>
                    <span className="font-semibold text-stone/70">Treatment: </span>
                    <span className="text-stone/60">[ ] Microblading  [ ] Combo Brows  [ ] Lip Blush</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone/70">Pigment Code & Batch: </span>
                    <span className="inline-block w-[50%] border-b border-stone/30"></span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ─── 5. IRONCLAD LEGAL DECLARATION & OVERTIME/REVISION CLAUSE (ALL FORMS) ─── */}
          <div className="mb-4 p-3 rounded-lg bg-[#FAF7F5] border-2 border-[#8B3A52]/20">
            <p className="font-poppins text-[9.5px] font-bold uppercase tracking-wider text-[#8B3A52] mb-1.5">
              5. Client Declaration, Overtime & Service Scope Acknowledgment
            </p>
            <div className="space-y-1.5 text-[9px] text-stone/80 leading-normal">
              <p>
                <strong>1. Pre-Agreed Scope & Fee:</strong> I confirm that the service inclusions, product lines, and total fee were explained and agreed upon prior to service commencement.
              </p>
              <p>
                <strong>2. Scheduled Slot & Overtime Surcharge:</strong> I acknowledge that the artist is booked strictly for the reserved time window indicated above. In the event of client-side delays exceeding 20 minutes, requests for additional services, or demands for complete hairstyle/makeup rework after approval, an add-on charge of <strong>INR 500 per 30 minutes</strong> (plus applicable product costs) will be added to the final invoice.
              </p>
              <p>
                <strong>3. Medical & Sensitivity Disclosure:</strong> I declare that all medical conditions, skin sensitivities, and past chemical/mehendi treatments have been truthfully stated. DoorStep Diva and its certified artists are not liable for adverse reactions stemming from non-disclosed conditions.
              </p>
              <p>
                <strong>4. Safe Professional Workplace:</strong> The client agrees to provide a safe, respectful working environment. The artist maintains the right to pause service if safety or professional boundaries are compromised.
              </p>
            </div>
          </div>

          {/* ─── 6. DUAL SIGNATURE BLOCK ─── */}
          <div className="pt-2 border-t border-stone/20">
            <div className="grid grid-cols-2 gap-6 text-[10px]">
              <div>
                <p className="font-semibold text-stone/70 mb-5">Client Signature & Date:</p>
                <div className="border-b border-stone/40 w-full mb-1"></div>
                <p className="text-[8.5px] text-stone/50 italic">
                  I have read, understood, and accept all terms above.
                </p>
              </div>

              <div>
                <p className="font-semibold text-stone/70 mb-5">Attending Artist Signature & Time Out:</p>
                <div className="border-b border-stone/40 w-full mb-1"></div>
                <p className="text-[8.5px] text-stone/50 italic">
                  Service completed cleanly as per DoorStep Diva protocol.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
