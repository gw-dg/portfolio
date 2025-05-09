import type { ReactNode } from "react"

interface ProjectCardProps {
  name: string
  icon: ReactNode
}

export default function ProjectCard({ name, icon }: ProjectCardProps) {
  return (
    <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer">
      {icon}
      <span>{name}</span>
    </div>
  )
}
