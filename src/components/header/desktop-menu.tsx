import Link from 'next/link'
import { MenuProps } from '@/types/header/navigation'

export function DesktopMenu({ links }: MenuProps) {
  return (
    <ul className="hidden md:flex gap-6">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className="hover:text-gray-300 transition-colors">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
