// Law structure: chapters (หมวด) and sub-sections (ส่วนที่)
// Source: docs/scout_act_2551.md + page images for missing OCR headings
//
// ส่วนที่ ๑–๒ found in MD; ส่วนที่ ๓–๕ confirmed from page_07–10.png
// (OCR missed those sub-section headings in the MD extraction)

export type DividerKind = 'chapter' | 'section'

export interface LawDivider {
  startSection: number
  kind: DividerKind
  label: string
}

export const LAW_DIVIDERS: LawDivider[] = [
  { startSection: 1,  kind: 'chapter', label: 'บทนิยาม' },
  { startSection: 6,  kind: 'chapter', label: 'หมวด ๑ — บททั่วไป' },
  { startSection: 11, kind: 'chapter', label: 'หมวด ๒ — การปกครอง' },
  { startSection: 11, kind: 'section', label: 'ส่วนที่ ๑ สภาลูกเสือไทย' },
  { startSection: 15, kind: 'section', label: 'ส่วนที่ ๒ คณะกรรมการบริหารลูกเสือแห่งชาติและสํานักงานลูกเสือแห่งชาติ' },
  { startSection: 28, kind: 'section', label: 'ส่วนที่ ๓ ลูกเสือจังหวัด' },
  { startSection: 35, kind: 'section', label: 'ส่วนที่ ๔ ลูกเสือเขตพื้นที่การศึกษา' },
  { startSection: 40, kind: 'section', label: 'ส่วนที่ ๕ ทรัพย์สินของสํานักงานลูกเสือแห่งชาติ' },
  { startSection: 43, kind: 'chapter', label: 'หมวด ๓ — การจัดกลุ่ม ประเภท และตำแหน่งลูกเสือ' },
  { startSection: 50, kind: 'chapter', label: 'หมวด ๔ — ธง เครื่องแบบ และการแต่งกาย' },
  { startSection: 53, kind: 'chapter', label: 'หมวด ๕ — เหรียญลูกเสือ และการยกย่องเชิดชูเกียรติ' },
  { startSection: 69, kind: 'chapter', label: 'บทกำหนดโทษ' },
  { startSection: 71, kind: 'chapter', label: 'บทเฉพาะกาล' },
]

// Lookup map: มาตรา number → ordered list of dividers to render before that section
export const DIVIDERS_BEFORE: Map<number, LawDivider[]> = new Map()
for (const d of LAW_DIVIDERS) {
  const list = DIVIDERS_BEFORE.get(d.startSection) ?? []
  DIVIDERS_BEFORE.set(d.startSection, [...list, d])
}
