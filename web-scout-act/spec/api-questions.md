# API Spec: GET /api/questions

## Endpoint

`GET /api/questions`

## Description

Returns up to 15 randomly selected multiple-choice questions from พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑. Supports optional มาตรา range scoping via `from` and `to` query params.

## Request

### Query Parameters

| param | type | required | description |
|-------|------|----------|-------------|
| `from` | number | no | มาตรา เริ่มต้น (Arabic numeral, 1–60) |
| `to` | number | no | มาตรา สิ้นสุด (Arabic numeral, 1–60) |

- If **neither** `from` nor `to` is provided → full exam mode (EXAM_QUOTA logic)
- If **both** are provided → scoped mode (random 15 from the matching pool)
- `from` must be ≤ `to` (enforced by the caller; API does not validate)

### Examples

```
GET /api/questions
GET /api/questions?from=11&to=36
GET /api/questions?from=1&to=10
```

---

## Mode 1: Full Exam (no params)

Uses `EXAM_QUOTA` to pick questions proportionally from every chapter.

| chapter | count |
|---------|-------|
| หมวด ๑ | 2 |
| หมวด ๒ | 5 |
| หมวด ๓ | 2 |
| หมวด ๔ | 1 |
| หมวด ๕ | 2 |
| หมวด ๖ | 1 |
| หมวด ๗ | 1 |
| บทเฉพาะกาล | 1 |
| **total** | **15** |

## Mode 2: Scoped Exam (from + to)

1. Filter `questionBank` where `sectionToInt(q.section)` is between `from` and `to` (inclusive)
2. Shuffle filtered pool (Fisher-Yates)
3. Slice first 15 (or fewer if pool is smaller)
4. Assign sequential `id` starting from 1

---

## Response

HTTP 200

```json
{
  "questions": [
    {
      "id": 1,
      "chapter": "หมวด ๒",
      "section": "มาตรา ๑๒",
      "question": "กรรมการผู้ทรงคุณวุฒิในสภาลูกเสือไทยมีวาระดำรงตำแหน่งคราวละกี่ปี?",
      "choices": {
        "ก": "๒ ปี",
        "ข": "๓ ปี",
        "ค": "๔ ปี",
        "ง": "๕ ปี"
      },
      "answer": "ค",
      "explanation": "มาตรา ๑๒ กรรมการผู้ทรงคุณวุฒิมีวาระดำรงตำแหน่งคราวละ ๔ ปี",
      "reference": "กรรมการผู้ทรงคุณวุฒิในสภาลูกเสือไทยมีวาระดํารงตําแหน่งคราวละ ๔ ปี และอาจได้รับแต่งตั้งอีกได้แต่ไม่เกินสองวาระติดต่อกัน..."
    }
  ]
}
```

### Question fields

| field | type | description |
|-------|------|-------------|
| `id` | number | ลำดับ 1–15 ใน exam นี้ |
| `chapter` | string | หมวด เช่น `"หมวด ๒"`, `"บทเฉพาะกาล"` |
| `section` | string | มาตราอ้างอิง เช่น `"มาตรา ๑๒"` |
| `question` | string | คำถาม (ภาษาไทย) |
| `choices` | object | ตัวเลือก ก ข ค ง |
| `answer` | `"ก"｜"ข"｜"ค"｜"ง"` | ตัวเลือกที่ถูกต้อง |
| `explanation` | string | คำอธิบายสั้น พร้อมอ้างอิงมาตรา (ภาษาไทย) |
| `reference` | string | ข้อความเต็มของมาตราที่อ้างอิง จาก `scout_act_2551.json` (ภาษาไทย) |

---

## Callers

| caller | params sent | when |
|--------|-------------|------|
| `app/page.tsx` | `from`, `to` (if user typed a range) | กดปุ่ม "เริ่มสอบ" |
| `app/exam/result/page.tsx` | none | กดปุ่ม "สร้างข้อสอบใหม่" (full exam) |

---

## Source files

| file | role |
|------|------|
| `app/api/questions/route.ts` | Next.js route handler, reads `from`/`to` from searchParams |
| `lib/questionBank.ts` | `generateExam()`, `generateScopedExam(from, to)`, `sectionToInt()` |
| `lib/q1.ts` | คำถามหมวด ๑ (มาตรา ๑–๑๐) |
| `lib/q2.ts` | คำถามหมวด ๒ (มาตรา ๑๑–๓๖) |
| `lib/q3.ts` | คำถามหมวด ๓–๗ และบทเฉพาะกาล (มาตรา ๓๗–๖๐) |
