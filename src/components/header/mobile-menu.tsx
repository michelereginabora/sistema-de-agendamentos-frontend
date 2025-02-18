"use client"

import Link from 'next/link'
import { MobileMenuProps } from '@/types/header/navigation'

export function MobileMenu({ isOpen, links, onLinkClick }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <ul className="md:hidden pt-4 pb-2 space-y-3">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link 
            href={href} 
            className="block py-2 hover:text-gray-300 transition-colors"
            onClick={onLinkClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
