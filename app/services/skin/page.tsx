'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'

const NAV_SECTIONS = [
  { id: 'waxing',    label: 'Waxing',    services: ['Sugar Wax', 'Chocolate Wax', 'Honey Wax', 'Rica Wax', 'Brazilian Wax', 'Roll-On Wax', 'Full Body Wax', 'Face Wax'] },
  { id: 'mani-pedi', label: 'Mani & Pedi', services: ['Classic Manicure', 'Spa Manicure', 'Paraffin Manicure', 'Classic Pedicure', 'Spa Pedicure', 'Paraffin Pedicure', 'Luxury Pedicure', 'Mani-Pedi Combo'] },
  { id: 'facials',   label: 'Facials',   services: ['Gold Facial', 'Diamond Facial', 'Fruit Facial', 'O3+ Facial', 'Anti-Aging Facial', 'Hydrating Facial', 'Brightening Facial', 'Bridal Glow Facial', 'Cleanup', 'De-Tan', 'Bleach'] },
  { id: 'body',      label: 'Body',      services: ['Coffee Scrub Polish', 'Rice Bran Polish', 'Chocolate Polish', 'Gold Polish', 'Chemical Peel', 'Body Polishing'] },
  { id: 'massage',   label: 'Massage',   services: ['Full Body Massage', 'Rejuvenating Massage', 'Head Massage', 'Shoulder & Back Massage', 'Foot Massage', 'Arms Massage'] },
  { id: 'threading', label: 'Threading', services: ['Eyebrow Threading', 'Upper Lip', 'Chin', 'Side Lock', 'Full Face Threading'] },
]

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { label: 'Skin' },
]

// ─── WAXING DATA ──────────────────────────────────────────────────────────────

const HONEY_WAX = [
  { area: 'Under Arms',               price: '₹89',    origPrice: '₹109',    time: '10 mins' },
  { area: 'Half Arms',                price: '₹249',   origPrice: '₹299',    time: '15 mins' },
  { area: 'Full Arms',                price: '₹299',   origPrice: '₹399',    time: '20 mins' },
  { area: 'Full Arms + Under Arms',   price: '₹299',   origPrice: '₹399',    time: '20 mins' },
  { area: 'Half Legs',                price: '₹335',   origPrice: '₹370',    time: '20 mins' },
  { area: 'Full Legs',                price: '₹399',   origPrice: '₹499',    time: '25 mins' },
  { area: 'Stomach',                  price: '₹379',   origPrice: '₹399',    time: '25 mins' },
  { area: 'Half Back',                price: '₹280',   origPrice: '₹380',    time: '20 mins' },
  { area: 'Full Back',                price: '₹489',   origPrice: '₹580',    time: '20 mins' },
  { area: 'Buttock',                  price: '₹399',   origPrice: '₹499',    time: '15 mins' },
  { area: 'Bikini Waxing',            price: '₹699',   origPrice: '₹899',    time: '25 mins' },
  { area: 'Full Body (no bikini)',    price: '₹1,199', origPrice: '₹1,499',  time: '60 mins' },
  { area: 'Full Body + Bikini',       price: '₹1,499', origPrice: '₹2,499',  time: '75 mins' },
]

const RICA_WAX = [
  { area: 'Under Arms',               price: '₹149',   origPrice: '₹199',    time: '10 mins' },
  { area: 'Half Arms',                price: '₹489',   origPrice: '₹649',    time: '15 mins' },
  { area: 'Full Arms',                price: '₹699',   origPrice: '₹899',    time: '30 mins' },
  { area: 'Full Arms + Under Arms',   price: '₹699',   origPrice: '₹899',    time: '30 mins' },
  { area: 'Half Legs',                price: '₹449',   origPrice: '₹599',    time: '15 mins' },
  { area: 'Full Legs',                price: '₹699',   origPrice: '₹899',    time: '30 mins' },
  { area: 'Stomach',                  price: '₹429',   origPrice: '₹799',    time: '15 mins' },
  { area: 'Half Back',                price: '₹429',   origPrice: '₹799',    time: '15 mins' },
  { area: 'Full Back',                price: '₹499',   origPrice: '₹899',    time: '20 mins' },
  { area: 'Buttock',                  price: '₹409',   origPrice: '₹699',    time: '25 mins' },
  { area: 'Bikini Waxing',            price: '₹849',   origPrice: '₹1,599',  time: '45 mins' },
  { area: 'Bikini Line / Butt Line',  price: '₹249',   origPrice: '₹399',    time: '25 mins' },
  { area: 'Full Body',                price: '₹1,899', origPrice: '₹3,199',  time: '60 mins' },
  { area: 'Full Body + Bikini',       price: '₹2,299', origPrice: '₹3,599',  time: '90 mins' },
]

const BRAZILIAN_WAX = [
  { area: 'Bikini Wax',               price: '₹999',   origPrice: '₹1,699',  time: '25 mins' },
  { area: 'Full Face',                price: '₹399',   origPrice: '₹699',    time: '25 mins' },
  { area: 'Upper Lip',                price: '₹55',    origPrice: '₹99',     time: '10 mins' },
  { area: 'Chin',                     price: '₹80',    origPrice: '₹149',    time: '10 mins' },
  { area: 'Forehead',                 price: '₹120',   origPrice: '₹199',    time: '15 mins' },
  { area: 'Under Arms',               price: '₹189',   origPrice: '₹279',    time: '10 mins' },
  { area: 'Side Lock',                price: '₹148',   origPrice: '₹249',    time: '15 mins' },
  { area: 'Buttock',                  price: '₹698',   origPrice: '₹999',    time: '20 mins' },
]

const ROLLON_WAX = [
  { area: 'Full Arms + Under Arms',   price: '₹599',   origPrice: '₹899',    time: '35 mins' },
  { area: 'Full Arms (no underarms)', price: '₹519',   origPrice: '₹799',    time: '30 mins' },
  { area: 'Full Legs',                price: '₹649',   origPrice: '₹1,299',  time: '35 mins' },
  { area: 'Half Legs',                price: '₹499',   origPrice: '₹999',    time: '20 mins' },
  { area: 'Full Back',                price: '₹599',   origPrice: '₹1,199',  time: '40 mins' },
  { area: 'Half Back',                price: '₹549',   origPrice: '₹1,049',  time: '25 mins' },
  { area: 'Stomach',                  price: '₹549',   origPrice: '₹1,049',  time: '25 mins' },
  { area: 'Full Body',                price: '₹2,099', origPrice: '₹3,299',  time: '80 mins' },
  { area: 'Full Body + Bikini',       price: '₹2,699', origPrice: '₹3,999',  time: '120 mins' },
]

const WAX_TYPES = [
  { type: 'Honey Wax',       feature: 'Traditional warm honey wax — gentle, effective, ideal for all skin types',   best: 'Sensitive skin, fine to medium hair, all body areas',  color: '#F5E0D0' },
  { type: 'Rica Wax',        feature: 'Liposoluble, rosin-free, pull-off formula for coarse Indian hair',            best: 'Coarse hair, underarms, normal to oily skin',          color: '#EFCCD4' },
  { type: 'Brazilian Wax',   feature: 'Full intimate area hair removal with precision technique',                    best: 'Complete bikini line to full Brazilian',               color: '#F0D8E8' },
  { type: 'Roll-On Wax',     feature: 'Hygienic cartridge application — quick, consistent, and mess-free',           best: 'Large areas — full legs, back, arms',                 color: '#F5E0D0' },
]

// ─── MANI-PEDI DATA ───────────────────────────────────────────────────────────

const MANICURE = [
  { name: 'Classic Manicure',    price: '₹349',  origPrice: '₹599',  time: '30 mins', included: 'Soak, nail shape, cuticle care, hand massage, nail paint',                        highlight: 'Everyday maintenance and polish refresh' },
  { name: 'Spa Manicure',        price: '₹399',  origPrice: '₹599',  time: '30 mins', included: 'Basic + exfoliation scrub, extended massage, nourishing mask',                    highlight: 'Deep hydration for dry or dull hands' },
  { name: 'Paraffin Manicure',   price: '₹699',  origPrice: '₹1,199', time: '30 mins', included: 'Spa steps + warm paraffin wax dip for hands',                                     highlight: 'Intense moisture lock, ideal for very dry or cracked skin' },
  { name: 'File Cut Polish',     price: '₹149',  origPrice: '₹250',  time: '15 mins', included: 'Nail file, shape, and polish application only',                                     highlight: 'Quick refresh between full manicures' },
]

const PEDICURE = [
  { name: 'Classic Pedicure',    price: '₹399',  origPrice: '₹599',  time: '35 mins', included: 'Soak, nail shaping, cuticle care, foot massage, nail paint',                      highlight: 'Clean, fresh, polished feet in under 45 mins' },
  { name: 'Spa Pedicure',        price: '₹499',  origPrice: '₹689',  time: '35 mins', included: 'Basic + scrub, extended massage, heel treatment, mask',                           highlight: 'Softens rough skin, relieves fatigue' },
  { name: 'Paraffin Pedicure',   price: '₹799',  origPrice: '₹1,498', time: '35 mins', included: 'Spa steps + paraffin wax boot treatment',                                         highlight: 'Deep conditioning for cracked heels and dry soles' },
  { name: 'Luxury Pedicure',     price: '₹999',  origPrice: null,     time: '50 mins', included: 'All spa steps + premium mask, serum, hot stone massage, full foot spa ritual',    highlight: 'Ultimate foot restoration and relaxation experience' },
]

const MANI_PEDI_COMBOS = [
  { name: 'Classic Mani + Pedi Combo',    price: '₹599',  origPrice: '₹1,299',  time: '60 mins' },
  { name: 'Spa Mani + Pedi Combo',        price: '₹799',  origPrice: '₹1,299',  time: '60 mins' },
  { name: 'O3+ Bubblegum Mani-Pedi',      price: '₹1,199', origPrice: '₹1,899',  time: '60 mins' },
  { name: 'Sara DeTan / Rose Mani-Pedi',  price: '₹999',  origPrice: '₹1,599',  time: '60 mins' },
]

// ─── FACIAL DATA ──────────────────────────────────────────────────────────────

const FACIALS = [
  { type: 'Gold Facial',        price: '₹1,199', origPrice: '₹1,500', time: '45 mins', best: 'Dull skin, anti-aging, special occasions — restores radiance',            accent: '#C8974A' },
  { type: 'Diamond Facial',     price: '₹1,299', origPrice: '₹1,599', time: '45 mins', best: 'Mature skin, fine lines — microdermabrasion-infused glow',                accent: '#B8C0CC' },
  { type: 'Fruit Facial',       price: '₹599',   origPrice: '₹999',   time: '45 mins', best: 'Young skin, natural brightening, everyday maintenance',                   accent: '#C8E0C0' },
  { type: 'O3+ Facial',         price: '₹1,599', origPrice: '₹2,500', time: '45 mins', best: 'Oily / acne-prone skin — deep purifying and pore minimizing',             accent: '#D0E8F0' },
  { type: 'Anti-Aging Facial',  price: '₹1,799', origPrice: '₹2,999', time: '60 mins', best: 'Fine lines, sagging — firming and lifting formulations',                  accent: '#F0D8E8' },
  { type: 'Hydrating Facial',   price: '₹749',   origPrice: '₹999',   time: '45 mins', best: 'Dry, dehydrated skin — hyaluronic acid-based deep moisture',              accent: '#D0E8F8' },
  { type: 'Brightening Facial', price: '₹949',   origPrice: '₹1,499', time: '45 mins', best: 'Pigmentation, uneven tone — vitamin C and kojic formulas',                accent: '#F8ECD0' },
  { type: 'Bridal Glow Facial',   price: '₹2,399', origPrice: '₹4,999', time: '60 mins', best: 'Pre-wedding radiance — multi-step ritual for the bride-to-be',           accent: '#EFCCD4' },
]

const QUICK_TREATMENTS = [
  { name: 'VLCC Fruit Cleanup',       price: '₹499', origPrice: '₹699',  time: '30 mins', desc: 'Deep-cleansing treatment that removes surface impurities and unclogs pores. Every 3–4 weeks.', accent: '#EFCCD4' },
  { name: 'VLCC Insta Glow Clean Up', price: '₹599', origPrice: '₹699',  time: '30 mins', desc: 'Quick radiance-boosting cleanse with instant brightening effect for dull skin.',              accent: '#EFCCD4' },
  { name: 'Lotus Cleanup',            price: '₹499', origPrice: '₹899',  time: '30 mins', desc: 'Herbal deep-cleansing treatment using Lotus Herbals formulations for all skin types.',            accent: '#F5E0D0' },
  { name: 'O3+ Cleanup',              price: '₹849', origPrice: '₹1,199', time: '30 mins', desc: 'Professional-grade O3+ cleansing with targeted serums for your specific skin concern.',           accent: '#F0D8E8' },
]

const BLEACH = [
  { area: 'Face & Neck',              price: '₹299', origPrice: '₹349', time: '20 mins' },
  { area: 'Under Arms',               price: '₹249', origPrice: '₹300', time: '10 mins' },
  { area: 'Full Arms',                price: '₹399', origPrice: '₹450', time: '20 mins' },
  { area: 'Half Legs',                price: '₹289', origPrice: '₹399', time: '15 mins' },
  { area: 'Full Legs',                price: '₹589', origPrice: '₹699', time: '20 mins' },
  { area: 'Stomach',                  price: '₹389', origPrice: '₹429', time: '20 mins' },
  { area: 'Half Back',                price: '₹389', origPrice: '₹429', time: '20 mins' },
  { area: 'Full Back',                price: '₹499', origPrice: '₹599', time: '20 mins' },
  { area: 'Full Body (without face)', price: '₹1,099', origPrice: '₹1,599', time: '45 mins' },
  { area: 'Full Body + Face & Neck',  price: '₹1,299', origPrice: '₹1,899', time: '60 mins' },
]

const DETAN = [
  { area: 'Face & Neck',              price: '₹399', origPrice: '₹449', time: '20 mins' },
  { area: 'Under Arms',               price: '₹199', origPrice: '₹249', time: '10 mins' },
  { area: 'Full Arms',                price: '₹499', origPrice: '₹549', time: '20 mins' },
  { area: 'Full Legs',                price: '₹449', origPrice: '₹549', time: '20 mins' },
  { area: 'Full Front',               price: '₹499', origPrice: '₹549', time: '20 mins' },
  { area: 'Half Back',                price: '₹329', origPrice: '₹380', time: '15 mins' },
  { area: 'Full Back',                price: '₹499', origPrice: '₹549', time: '30 mins' },
  { area: 'Full Body (without face)', price: '₹1,199', origPrice: '₹1,599', time: '45 mins' },
  { area: 'Full Body + Face & Neck',  price: '₹1,299', origPrice: '₹1,999', time: '60 mins' },
]

const PEELS = [
  { peel: 'Glycolic Acid Peel',  price: '₹1,499', concern: 'Dull skin, fine lines, texture' },
  { peel: 'Salicylic Acid Peel', price: '₹1,499', concern: 'Acne, blackheads, oily skin' },
  { peel: 'Lactic Acid Peel',    price: '₹1,299', concern: 'Sensitive skin, mild brightening' },
  { peel: 'TCA Peel',            price: '₹2,499', concern: 'Deep pigmentation, moderate scars' },
  { peel: 'Kojic Acid Peel',     price: '₹1,799', concern: 'Melasma, hyperpigmentation' },
]

const ADVANCED = [
  { treatment: 'Acne Treatment',        price: '₹1,499', focus: 'Active breakout management and prevention' },
  { treatment: 'Pigmentation Treatment', price: '₹1,799', focus: 'Dark spots, melasma, post-inflammatory marks' },
  { treatment: 'Hydra Facial',          price: '₹2,499', focus: 'Multi-step cleanse, extract, hydrate protocol' },
  { treatment: 'LED Light Therapy',     price: '₹1,299', focus: 'Collagen stimulation, bacteria control' },
  { treatment: 'Meso Therapy',          price: '₹2,999', focus: 'Nutrient infusion for skin rejuvenation' },
]

const BODY_POLISH = [
  { type: 'Coffee Scrub Polish',    price: '₹1,099', origPrice: '₹2,198', time: '75 mins', benefit: 'Circulation boost, cellulite reduction' },
  { type: 'Rice Bran Polish',       price: '₹1,099', time: '75 mins', benefit: 'Skin brightening, smoothing' },
  { type: 'Chocolate Polish',       price: '₹1,099', time: '75 mins', benefit: 'Antioxidant nourishment, softening' },
  { type: 'Gold Polish',            price: '₹1,799', origPrice: '₹3,499', time: '75 mins', benefit: 'Radiance, anti-aging, special occasions' },
  { type: 'Lotus SPA Crystal Polish', price: '₹1,799', origPrice: '₹3,499', time: '75 mins', benefit: 'Luxury crystal-infused full body treatment' },
]

// ─── MASSAGE DATA ─────────────────────────────────────────────────────────────

const MASSAGES = [
  { name: 'Full Body Massage',       price: '₹899',  origPrice: '₹1,799', time: '45 mins', desc: 'Relaxing full body massage using aromatic oils — relieves muscle tension and improves circulation. Face not covered.' },
  { name: 'Rejuvenating Massage',    price: '₹1,299', origPrice: '₹2,299', time: '75 mins', desc: 'Full body massage + gentle body scrub + hydration — a complete renewal ritual for tired, stressed skin.' },
  { name: 'Head Massage',            price: '₹299',  origPrice: '₹399',  time: '20 mins', desc: 'Deep scalp massage targeting pressure points — relieves stress, improves scalp health and blood circulation.' },
  { name: 'Shoulder & Back Massage', price: '₹349',  origPrice: '₹499',  time: '20 mins', desc: 'Focused deep-tissue work on shoulder blades, upper back, and lower back — reduces tightness and muscle pain.' },
  { name: 'Foot Massage',            price: '₹349',  origPrice: '₹499',  time: '20 mins', desc: 'Reflexology-based foot massage targeting pressure points — improves circulation and relieves foot fatigue.' },
  { name: 'Arms Massage',            price: '₹349',  origPrice: '₹499',  time: '20 mins', desc: 'Targeted arm and hand massage to improve energy flow, relieve pain, and ease stiffness from daily work.' },
]

// ─── THREADING DATA ───────────────────────────────────────────────────────────

const THREADING = [
  { name: 'Eyebrow Threading',   price: '₹30', origPrice: '₹50', time: '5 mins' },
  { name: 'Upper Lip Threading', price: '₹30', origPrice: '₹50', time: '5 mins' },
  { name: 'Chin Threading',      price: '₹30', origPrice: '₹50', time: '5 mins' },
  { name: 'Side Lock Threading', price: '₹30', origPrice: '₹50', time: '5 mins' },
  { name: 'Full Face Threading', price: '₹139', origPrice: '₹250', time: '15 mins' },
]

// ─── PACKAGES ─────────────────────────────────────────────────────────────────

const PACKAGES = [
  { name: 'Classic Skin Package',     price: '₹899',  origPrice: '₹1,590', time: '75 mins',  includes: 'VLCC Facial + Bleach + Threading' },
  { name: 'VLCC Skin Package',        price: '₹1,299', origPrice: '₹1,999', time: '120 mins', includes: 'Facial + Full Wax + Bleach + Threading' },
  { name: 'Homely Groom Package',     price: '₹1,699', origPrice: '₹2,700', time: '130 mins', includes: 'Facial + Mani + Pedi + Bleach + Threading' },
  { name: 'Blogger Beauty',           price: '₹1,899', origPrice: '₹2,800', time: '120 mins', includes: 'O3+ Gold Facial + Rica Full Wax + Threading' },
  { name: 'Glam Up',                  price: '₹2,149', origPrice: '₹3,856', time: '175 mins', includes: 'O3+ Facial + Honey Full Wax + Mani + Pedi + Bleach + Threading' },
  { name: 'Home Salon Gift',          price: '₹1,899', origPrice: '₹3,490', time: '210 mins', includes: 'VLCC Facial + Full Wax + Mani + Pedi + Bleach + Threading' },
  { name: 'Essentials Package',       price: '₹2,799', origPrice: '₹4,899', time: '180 mins', includes: 'Diamond Facial + Wax + Mani + Pedi + Hair Spa' },
  { name: 'Makeover Package',         price: '₹2,749', origPrice: '₹4,850', time: '240 mins', includes: 'O3+ Facial + Full Wax + Bikini + Mani + Pedi' },
  { name: 'Tip To Toe',               price: '₹2,799', origPrice: '₹5,158', time: '200 mins', includes: 'Lotus Facial + Wax + Mani + Pedi + Hair Spa' },
]

// ─── ADD-ONS ──────────────────────────────────────────────────────────────────

const ADDONS = [
  { name: 'Nail Paint (Hands or Feet)', price: '₹100–₹199', note: 'Quick polish refresh after mani or pedi' },
  { name: 'Head Massage Add-On (15 min)', price: '₹199', note: 'Add to any facial or body service' },
  { name: 'Eyebrow Threading Add-On',   price: '₹30',  note: 'Pair with any facial or waxing service' },
  { name: 'Upper Lip Threading Add-On',  price: '₹30',  note: 'Pair with any facial or waxing service' },
  { name: 'Face Mask Add-On',            price: '₹199–₹299', note: 'Sheet or cream mask add-on to any facial' },
]

function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  return (
    <div className={`reveal reveal-d${Math.min(index + 1, 6)} bg-white rounded-2xl border overflow-hidden transition-colors duration-200 ${open ? 'border-rose/30' : 'border-blush/20'}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-petal/50 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={`font-poppins text-sm font-semibold transition-colors ${open ? 'text-rose' : 'text-stone'}`}>{faq.q}</span>
        <span className={`faq-icon flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-rose font-bold text-xs ${open ? 'open border-rose/40' : 'border-blush/40'}`}>+</span>
      </button>
      <div className="faq-body" ref={bodyRef} style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 200}px` : '0px' }}>
        <p className="font-poppins text-sm text-stone-light leading-relaxed pb-5 px-6">{faq.a}</p>
      </div>
    </div>
  )
}

function PriceTag({ price, origPrice, small }: { price: string; origPrice?: string | null; small?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`font-poppins font-bold text-rose ${small ? 'text-sm' : 'text-base'}`}>{price}</span>
      {origPrice && (
        <span className="font-poppins text-xs text-stone-light/50 line-through">{origPrice}</span>
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SkinPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 top-0 w-[550px] h-[550px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #F5E0D0 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
            {BREADCRUMB.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-rose/30 text-xs">›</span>}
                {item.href
                  ? <Link href={item.href} className="font-poppins text-xs text-stone-light hover:text-rose transition-colors tracking-wider">{item.label}</Link>
                  : <span className="font-poppins text-xs text-rose font-semibold tracking-wider">{item.label}</span>}
              </span>
            ))}
          </nav>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-6">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 02</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Skin<br /><em className="text-rose">Services</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">
                Waxing · Facials · Mani-Pedi · Massage · Body Care
              </p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Full-spectrum skincare — waxing, brightening facials, chemical peels, nail care, threading, body massage, and body treatments. Formulated for Indian skin tones and climate.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Waxing', 'Facials', 'Mani-Pedi', 'Body Polish', 'Massage', 'Threading'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Skin Session
              </a>
            </div>

            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-72 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png" alt="Skin Services at home — DoorStep Diva" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    Indian Skin Specialists
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Waxing',        sub: '4 wax types',      color: '#F5E0D0', icon: '◇' },
                  { label: 'Facials',       sub: '8 facial types',   color: '#F0D8E8', icon: '✦' },
                  { label: 'Mani & Pedi',   sub: '8 services',       color: '#EFCCD4', icon: '◈' },
                  { label: 'Massage',        sub: '6 massage types',  color: '#E8D8F0', icon: '✿' },
                ].map(c => (
                  <div key={c.label} className="rounded-2xl p-5 border border-blush/20 bg-white"
                    style={{ borderTop: `3px solid ${c.color}` }}>
                    <span className="text-xl text-rose/60 block mb-2">{c.icon}</span>
                    <p className="font-playfair text-lg font-bold text-stone mb-0.5">{c.label}</p>
                    <p className="font-poppins text-xs text-stone-light">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* ── WAXING ───────────────────────────────────────────────────── */}
      <section id="waxing" className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-10 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Hair Removal</p>
          <h2 className="font-playfair text-4xl font-bold text-stone">Waxing <em className="text-rose">Services</em></h2>
        </div>

        {/* Wax type cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {WAX_TYPES.map((w, i) => (
            <div key={w.type}
              className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift bg-white rounded-3xl p-7 border border-blush/20 group`}>
              <div className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center text-stone font-bold text-lg"
                style={{ background: w.color }}>◇</div>
              <h3 className="font-poppins text-base font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{w.type}</h3>
              <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4">{w.feature}</p>
              <div className="bg-petal rounded-xl px-4 py-2">
                <p className="font-poppins text-xs text-rose font-medium">Best for: {w.best}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Honey Wax price table */}
        <div className="mb-12">
          <div className="mb-5 reveal">
            <p className="font-poppins label-caps text-rose mb-1">Price List</p>
            <h3 className="font-playfair text-2xl font-bold text-stone">Honey Wax</h3>
          </div>
          <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden reveal">
            <div className="grid grid-cols-12 bg-stone px-6 py-4">
              <p className="col-span-5 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70">Area</p>
              <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Time</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-right">Book</p>
            </div>
            {HONEY_WAX.map((w, i) => (
              <div key={w.area} className={`grid grid-cols-12 px-6 py-4 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{w.area}</p>
                <div className="col-span-3 text-center"><PriceTag price={w.price} origPrice={w.origPrice} /></div>
                <p className="col-span-2 font-poppins text-xs text-stone-light text-center">{w.time}</p>
                <div className="col-span-2 text-right">
                  <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-poppins text-[10px] font-semibold text-rose hover:underline">Book →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rica Wax price table */}
        <div className="mb-12">
          <div className="mb-5 reveal">
            <h3 className="font-playfair text-2xl font-bold text-stone">Rica Wax <span className="font-poppins text-sm font-normal text-stone-light">(Premium)</span></h3>
          </div>
          <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden reveal">
            <div className="grid grid-cols-12 bg-stone px-6 py-4">
              <p className="col-span-5 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70">Area</p>
              <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Time</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-right">Book</p>
            </div>
            {RICA_WAX.map((w, i) => (
              <div key={w.area} className={`grid grid-cols-12 px-6 py-4 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{w.area}</p>
                <div className="col-span-3 text-center"><PriceTag price={w.price} origPrice={w.origPrice} /></div>
                <p className="col-span-2 font-poppins text-xs text-stone-light text-center">{w.time}</p>
                <div className="col-span-2 text-right">
                  <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-poppins text-[10px] font-semibold text-rose hover:underline">Book →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brazilian Wax */}
        <div className="mb-12">
          <div className="mb-5 reveal">
            <h3 className="font-playfair text-2xl font-bold text-stone">Rica Brazilian Wax</h3>
          </div>
          <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden reveal">
            <div className="grid grid-cols-12 bg-stone px-6 py-4">
              <p className="col-span-5 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70">Area</p>
              <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Time</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-right">Book</p>
            </div>
            {BRAZILIAN_WAX.map((w, i) => (
              <div key={w.area} className={`grid grid-cols-12 px-6 py-4 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{w.area}</p>
                <div className="col-span-3 text-center"><PriceTag price={w.price} origPrice={w.origPrice} /></div>
                <p className="col-span-2 font-poppins text-xs text-stone-light text-center">{w.time}</p>
                <div className="col-span-2 text-right">
                  <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-poppins text-[10px] font-semibold text-rose hover:underline">Book →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roll-On Wax */}
        <div className="mb-12">
          <div className="mb-5 reveal">
            <h3 className="font-playfair text-2xl font-bold text-stone">Rica Roll-On Wax <span className="font-poppins text-sm font-normal text-stone-light">(Hygienic Cartridge)</span></h3>
          </div>
          <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden reveal">
            <div className="grid grid-cols-12 bg-stone px-6 py-4">
              <p className="col-span-5 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70">Area</p>
              <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Time</p>
              <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-right">Book</p>
            </div>
            {ROLLON_WAX.map((w, i) => (
              <div key={w.area} className={`grid grid-cols-12 px-6 py-4 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{w.area}</p>
                <div className="col-span-3 text-center"><PriceTag price={w.price} origPrice={w.origPrice} /></div>
                <p className="col-span-2 font-poppins text-xs text-stone-light text-center">{w.time}</p>
                <div className="col-span-2 text-right">
                  <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-poppins text-[10px] font-semibold text-rose hover:underline">Book →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANI-PEDI ─────────────────────────────────────────────────  */}
      <section id="mani-pedi" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Manicure */}
            <div>
              <p className="font-poppins label-caps text-rose mb-3 reveal">Hand &amp; Nail Care</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8 reveal">Manicure</h2>
              <div className="flex flex-col gap-4">
                {MANICURE.map((m, i) => (
                  <div key={m.name}
                    className={`reveal reveal-d${i + 1} card-lift bg-white rounded-2xl p-6 border border-blush/20`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-poppins text-sm font-semibold text-stone">{m.name}</h3>
                      <PriceTag price={m.price} origPrice={m.origPrice} small />
                    </div>
                    <p className="font-poppins text-sm text-stone-light mb-3 leading-relaxed">{m.included}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-blush/30 text-rose font-poppins text-xs font-medium px-3 py-1 rounded-full">{m.highlight}</span>
                      <span className="font-poppins text-xs text-stone-light/60">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pedicure */}
            <div>
              <p className="font-poppins label-caps text-rose mb-3 reveal">Foot &amp; Nail Care</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8 reveal">Pedicure</h2>
              <div className="flex flex-col gap-4">
                {PEDICURE.map((p, i) => (
                  <div key={p.name}
                    className={`reveal reveal-d${i + 1} card-lift bg-white rounded-2xl p-6 border border-blush/20`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-poppins text-sm font-semibold text-stone">{p.name}</h3>
                      <PriceTag price={p.price} origPrice={p.origPrice} small />
                    </div>
                    <p className="font-poppins text-sm text-stone-light mb-3 leading-relaxed">{p.included}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-blush/30 text-rose font-poppins text-xs font-medium px-3 py-1 rounded-full">{p.highlight}</span>
                      <span className="font-poppins text-xs text-stone-light/60">{p.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mani-Pedi Combos */}
          <div className="mt-16 reveal">
            <h3 className="font-playfair text-2xl font-bold text-stone mb-6">Mani-Pedi <em className="text-rose">Combos</em></h3>
            <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden">
              <div className="grid grid-cols-12 bg-stone px-6 py-4">
                <p className="col-span-4 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70">Combo</p>
                <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
                <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Time</p>
                <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-right">Book</p>
              </div>
              {MANI_PEDI_COMBOS.map((c, i) => (
                <div key={c.name} className={`grid grid-cols-12 px-6 py-4 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                  <p className="col-span-4 font-poppins text-sm font-semibold text-stone">{c.name}</p>
                  <div className="col-span-3 text-center"><PriceTag price={c.price} origPrice={c.origPrice} /></div>
                  <p className="col-span-3 font-poppins text-xs text-stone-light text-center">{c.time}</p>
                  <div className="col-span-2 text-right">
                    <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-poppins text-[10px] font-semibold text-rose hover:underline">Book →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FACIALS ───────────────────────────────────────────────────── */}
      <section id="facials" className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Comprehensive Skin Therapy</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">
            Facial <em className="text-rose">Treatments</em>
          </h2>
          <p className="font-poppins text-stone-light text-base max-w-lg mx-auto">
            Eight facial types covering every skin concern. All follow a multi-step protocol using targeted product lines.
          </p>
        </div>

        {/* Full facial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {FACIALS.map((f, i) => (
            <div key={f.type}
              className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift bg-white rounded-2xl p-5 border border-blush/20 group`}>
              <div className="w-8 h-8 rounded-xl mb-4" style={{ background: f.accent + '80' }} />
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-poppins text-sm font-semibold text-stone group-hover:text-rose transition-colors">{f.type}</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-poppins text-base font-bold text-rose">{f.price}</span>
                {f.origPrice && <span className="font-poppins text-xs text-stone-light/50 line-through">{f.origPrice}</span>}
                <span className="font-poppins text-[10px] text-stone-light/50 ml-auto">{f.time}</span>
              </div>
              <p className="font-poppins text-sm text-stone-light leading-relaxed">{f.best}</p>
            </div>
          ))}
        </div>

        {/* Quick treatments */}
        <div className="mb-16 reveal">
          <h3 className="font-playfair text-2xl font-bold text-stone mb-6">Cleanup <em className="text-rose">& Quick Fixes</em></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_TREATMENTS.map((t, i) => (
              <div key={t.name}
                className={`reveal reveal-d${i + 1} card-lift rounded-2xl p-5 border border-blush/20`}
                style={{ background: t.accent + '30' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-poppins text-sm font-semibold text-stone">{t.name}</h4>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-poppins text-base font-bold text-rose">{t.price}</span>
                  {t.origPrice && <span className="font-poppins text-xs text-stone-light/50 line-through">{t.origPrice}</span>}
                </div>
                <p className="font-poppins text-sm text-stone-light leading-relaxed mb-2">{t.desc}</p>
                <span className="font-poppins text-xs text-stone-light/50">{t.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bleach & De-Tan */}
        <div className="grid md:grid-cols-2 gap-12 reveal">
          {/* Bleach */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-stone mb-4">Bleach</h3>
            <div className="bg-white rounded-2xl border border-blush/20 overflow-hidden">
              <div className="grid grid-cols-12 bg-stone px-5 py-3">
                <p className="col-span-5 font-poppins text-[10px] font-semibold tracking-wider uppercase text-white/70">Area</p>
                <p className="col-span-4 font-poppins text-[10px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
                <p className="col-span-3 font-poppins text-[10px] font-semibold tracking-wider uppercase text-white/70 text-right">Time</p>
              </div>
              {BLEACH.map((b, i) => (
                <div key={b.area} className={`grid grid-cols-12 px-5 py-3 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                  <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{b.area}</p>
                  <div className="col-span-4 text-center"><PriceTag price={b.price} origPrice={b.origPrice} small /></div>
                  <p className="col-span-3 font-poppins text-xs text-stone-light text-right">{b.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* De-Tan */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-stone mb-4">De-Tan</h3>
            <div className="bg-white rounded-2xl border border-blush/20 overflow-hidden">
              <div className="grid grid-cols-12 bg-stone px-5 py-3">
                <p className="col-span-5 font-poppins text-[10px] font-semibold tracking-wider uppercase text-white/70">Area</p>
                <p className="col-span-4 font-poppins text-[10px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
                <p className="col-span-3 font-poppins text-[10px] font-semibold tracking-wider uppercase text-white/70 text-right">Time</p>
              </div>
              {DETAN.map((d, i) => (
                <div key={d.area} className={`grid grid-cols-12 px-5 py-3 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                  <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{d.area}</p>
                  <div className="col-span-4 text-center"><PriceTag price={d.price} origPrice={d.origPrice} small /></div>
                  <p className="col-span-3 font-poppins text-xs text-stone-light text-right">{d.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY & ADVANCED ───────────────────────────────────────────── */}
      <section id="body" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Body Polish */}
            <div>
              <p className="font-poppins label-caps text-rose mb-3 reveal">Full Body</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-3 reveal">Body Polishing</h2>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 reveal">
                Full-body exfoliation and nourishment ritual that buffs away dead skin cells, evens out tone, and leaves skin silky and luminous.
              </p>
              <div className="flex flex-col gap-3">
                {BODY_POLISH.map((b, i) => (
                  <div key={b.type}
                    className={`reveal reveal-d${i + 1} card-lift flex items-center justify-between bg-white rounded-2xl p-5 border border-blush/20`}>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-rose flex-shrink-0" />
                      <div>
                        <p className="font-poppins text-sm font-semibold text-stone">{b.type}</p>
                        <p className="font-poppins text-sm text-stone-light">{b.benefit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <PriceTag price={b.price} origPrice={b.origPrice} small />
                      <p className="font-poppins text-[10px] text-stone-light/50">{b.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chemical Peels + Advanced */}
            <div className="space-y-12">
              <div>
                <p className="font-poppins label-caps text-rose mb-3 reveal">Clinical</p>
                <h2 className="font-playfair text-4xl font-bold text-stone mb-6 reveal">Chemical Peels</h2>
                <div className="flex flex-col gap-3">
                  {PEELS.map((p, i) => (
                    <div key={p.peel}
                      className={`reveal reveal-d${i + 1} card-lift flex justify-between items-center bg-white rounded-xl p-4 border border-blush/20`}>
                      <div>
                        <p className="font-poppins text-sm font-semibold text-stone">{p.peel}</p>
                        <p className="font-poppins text-xs text-stone-light">{p.concern}</p>
                      </div>
                      <span className="font-poppins text-sm font-bold text-rose">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-poppins label-caps text-rose mb-3 reveal">Advanced</p>
                <h2 className="font-playfair text-4xl font-bold text-stone mb-6 reveal">Skin Treatments</h2>
                <div className="flex flex-col gap-3">
                  {ADVANCED.map((a, i) => (
                    <div key={a.treatment}
                      className={`reveal reveal-d${i + 1} card-lift flex justify-between items-center bg-white rounded-xl p-4 border border-blush/20`}>
                      <div>
                        <p className="font-poppins text-sm font-semibold text-stone">{a.treatment}</p>
                        <p className="font-poppins text-xs text-stone-light">{a.focus}</p>
                      </div>
                      <span className="font-poppins text-sm font-bold text-rose">{a.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="mt-16 reveal">
            <h3 className="font-playfair text-2xl font-bold text-stone mb-6">Package <em className="text-rose">Deals</em></h3>
            <p className="font-poppins text-stone-light text-sm mb-6">Save more by bundling — curated packages for every need and budget.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PACKAGES.map((p, i) => (
                <div key={p.name} className="card-lift bg-white rounded-2xl p-5 border border-blush/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-poppins text-sm font-semibold text-stone">{p.name}</h4>
                    <PriceTag price={p.price} origPrice={p.origPrice} small />
                  </div>
                  <p className="font-poppins text-xs text-stone-light mb-2">{p.includes}</p>
                  <span className="font-poppins text-[10px] text-stone-light/50">{p.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MASSAGE ───────────────────────────────────────────────────── */}
      <section id="massage" className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-10 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Relax & Rejuvenate</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Body <em className="text-rose">Massage</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-xl">
            Therapeutic and relaxation massages using aromatic oils — relieve tension, improve circulation, and restore energy. All sessions use premium massage oils suited for Indian skin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MASSAGES.map((m, i) => (
            <div key={m.name}
              className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift bg-white rounded-2xl p-6 border border-blush/20 group`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-poppins text-sm font-semibold text-stone group-hover:text-rose transition-colors">{m.name}</h3>
                <PriceTag price={m.price} origPrice={m.origPrice} small />
              </div>
              <p className="font-poppins text-sm text-stone-light leading-relaxed mb-3">{m.desc}</p>
              <span className="font-poppins text-[10px] text-stone-light/50">{m.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREADING ──────────────────────────────────────────────────── */}
      <section id="threading" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="mb-8 reveal">
            <p className="font-poppins label-caps text-rose mb-3">Precision Hair Removal</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Threading <em className="text-rose">Services</em></h2>
            <p className="font-poppins text-stone-light text-sm max-w-xl">
              Traditional cotton-thread technique for precise eyebrow shaping and facial hair removal. Quick, chemical-free, and gentle on the skin.
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden reveal">
              <div className="grid grid-cols-12 bg-stone px-6 py-4">
                <p className="col-span-5 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70">Service</p>
                <p className="col-span-3 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Price</p>
                <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-center">Time</p>
                <p className="col-span-2 font-poppins text-[11px] font-semibold tracking-wider uppercase text-white/70 text-right">Book</p>
              </div>
              {THREADING.map((t, i) => (
                <div key={t.name} className={`grid grid-cols-12 px-6 py-4 items-center border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/30'}`}>
                  <p className="col-span-5 font-poppins text-sm font-semibold text-stone">{t.name}</p>
                  <div className="col-span-3 text-center"><PriceTag price={t.price} origPrice={t.origPrice} /></div>
                  <p className="col-span-2 font-poppins text-xs text-stone-light text-center">{t.time}</p>
                  <div className="col-span-2 text-right">
                    <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-poppins text-[10px] font-semibold text-rose hover:underline">Book →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-10 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Extras</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Quick <em className="text-rose">Add-Ons</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-xl">Small extras you can add to any service — just tell the artist when you book.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADDONS.map((a, i) => (
            <div key={a.name}
              className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift bg-white rounded-xl p-5 border border-blush/20 flex items-start justify-between`}>
              <div>
                <p className="font-poppins text-sm font-semibold text-stone">{a.name}</p>
                <p className="font-poppins text-xs text-stone-light">{a.note}</p>
              </div>
              <span className="font-poppins text-sm font-bold text-rose flex-shrink-0 ml-3">{a.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 md:px-16 pb-24">
        <div className="text-center mb-14 reveal">
          <h2 className="font-playfair text-4xl font-bold text-stone">Common <em className="text-rose">Questions</em></h2>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { q: 'Which wax type is best for sensitive skin?', a: 'Honey wax is the gentlest option for sensitive skin. It is water-soluble and does not adhere to live skin cells — only to the hair. For intimate areas, Brazilian wax specialists use a formulation designed for minimal irritation.' },
            { q: 'How often should I get a facial?', a: 'For most skin types, a facial every 4–6 weeks is ideal. This aligns with your skin\'s natural cell turnover cycle. Your artist will recommend the right frequency based on your skin assessment.' },
            { q: 'Can I combine waxing and a facial in one appointment?', a: 'Yes — but in a specific order. Waxing is always performed first, followed by the facial. Many of our package deals include this combination.' },
            { q: 'Do you bring your own products and equipment?', a: 'Absolutely. Every session arrives fully equipped with professional tools, branded products, fresh disposables, and a sanitized workstation. You don\'t need to arrange anything.' },
            { q: 'Is there a difference between cleanup and facial?', a: 'Yes — a cleanup is a 30-minute deep-cleansing treatment focused on removing surface impurities and unclogging pores. A facial is a full 45–60 minute ritual including cleansing, toning, exfoliation, massage, mask, and serum application.' },
            { q: 'Do you offer bridal skin packages?', a: 'Yes — we recommend starting 8–12 weeks before the wedding with a consultation. Our team will create a custom skin prep plan combining facials, de-tan, and body polishing spread across multiple pre-wedding sessions.' },
          ].map((f, i) => <FaqItem key={f.q} faq={f} index={i} />)}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5E0D0' }} />
          <p className="font-poppins label-caps text-rose-light mb-4 relative z-10">Glow From Within</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">
            Book Your Skin <em className="text-blush">Session Today</em>
          </h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">
            Certified skin therapists arriving at your doorstep — with all products, tools, and expertise included.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">
              <WAIcon size={15} />
              Book Now on WhatsApp
            </a>
            <Link href="/#services"
              className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
