import type { Metadata } from 'next'
import { ProjectsPage } from '@/components/projects'

export const metadata: Metadata = {
  title: 'Projects | B.S. HITECH',
  description: 'Explore the premium residences of B.S. HITECH by Bigrahpurm Developers.',
}

export default function Page() {
  return <ProjectsPage />
}