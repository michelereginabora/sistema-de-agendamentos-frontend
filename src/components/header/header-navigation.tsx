"use client"

import { useMenu } from '@/hooks/header/use-menu'
import { MenuIcon } from './menu-icon'
import { DesktopMenu } from './desktop-menu'
import { MobileMenu } from './mobile-menu'
import { NavigationLink } from '@/types/header/navigation'

const navigationLinks: NavigationLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/login', label: 'Entrar' },
  { href: '/service-catalog', label: 'Serviços' }
]

export default function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu()

  return (
    <header className="p-4 shadow-md">
      <nav className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h3>
            Sistema de Agendamento
          </h3>

          <button 
            onClick={toggleMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>

          <DesktopMenu links={navigationLinks} />
        </div>

        <MobileMenu 
          isOpen={isMenuOpen} 
          links={navigationLinks}
          onLinkClick={closeMenu}
        />
      </nav>
    </header>
  )
}