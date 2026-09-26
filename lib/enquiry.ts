export const GOOGLE_SCRIPT_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbxgFRkC7wpezDqV7XeW2X0GL9oeq-AFnn6XjcqnuY29GmwpYYepMWJbZhJaX8APl7Ie/exec'

export interface EnquiryPayload {
  fullName: string
  email: string
  phone: string
  interestedIn: string
  message: string
  formType: 'Book Site Visit' | 'Enquire Now'
}

export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<{ success: boolean; message?: string }> {
  let lastError: any = null

  // 1. Try internal Next.js API route first for optimal reliability
  try {
    const apiRes = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (apiRes.ok) {
      const data = await apiRes.json()
      if (data && data.success !== false) {
        return { success: true, message: data.message || 'Enquiry submitted successfully' }
      }
      if (data && data.error) {
        lastError = new Error(data.error)
      }
    }
  } catch (err) {
    lastError = err
  }

  // 2. Fallback directly to Google Apps Script Web App endpoint
  try {
    const directRes = await fetch(GOOGLE_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })

    if (!directRes.ok) {
      throw new Error(`Submission failed (${directRes.status}). Please try again.`)
    }

    const data = await directRes.json().catch(() => ({ success: true }))
    return { success: true, message: data.message || 'Enquiry submitted successfully' }
  } catch (err: any) {
    throw lastError || err || new Error('Network error. Please try again.')
  }
}
