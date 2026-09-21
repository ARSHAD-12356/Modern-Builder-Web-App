import { notFound } from 'next/navigation'
import { DetailPage } from '@/components/site'

const slugs = ['overview', 'amenities', 'floor-plans', 'payment-plan', 'gallery', 'testimonials', 'faq', 'contact']

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slugs.includes(slug)) notFound()
  return <DetailPage slug={slug} />
}
