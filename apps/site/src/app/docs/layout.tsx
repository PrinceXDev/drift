import {Sidebar} from '@/components/DocsNav'
import {navigation} from '@/lib/docs'

export default async function DocsLayout({children}: {children: React.ReactNode}) {
  const groups = await navigation()

  return (
    <div className="docs">
      <Sidebar groups={groups} />
      {children}
    </div>
  )
}
