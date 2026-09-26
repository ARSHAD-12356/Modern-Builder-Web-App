import { NextResponse } from 'next/server'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxgFRkC7wpezDqV7XeW2X0GL9oeq-AFnn6XjcqnuY29GmwpYYepMWJbZhJaX8APl7Ie/exec'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, interestedIn, message, formType } = body

    const payload = {
      fullName: String(fullName || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      interestedIn: String(interestedIn || '').trim(),
      message: String(message || '').trim(),
      formType: formType === 'Book Site Visit' ? 'Book Site Visit' : 'Enquire Now',
    }

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errorText = await res.text().catch(() => '')
      return NextResponse.json(
        {
          success: false,
          error: `Google Script error (${res.status}): ${errorText.slice(0, 100)}`,
        },
        { status: 502 }
      )
    }

    const data = await res.json().catch(() => ({ success: true }))
    return NextResponse.json({ success: true, ...data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to submit form' },
      { status: 500 }
    )
  }
}
