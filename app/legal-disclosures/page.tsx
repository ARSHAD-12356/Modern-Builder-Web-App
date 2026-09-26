import { LegalDisclosuresPage } from '@/components/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal & Mandatory Disclosures | Bigrahpurm Developers Pvt. Ltd.',
  description: 'Official statutory and regulatory documents, RERA certificate, and mandatory disclosures for B.S. HITECH by Bigrahpurm Developers Pvt. Ltd.',
}

export default function Page() {
  return <LegalDisclosuresPage />
}
