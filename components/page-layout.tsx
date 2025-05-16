import type { ReactNode } from "react"

interface PageLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
