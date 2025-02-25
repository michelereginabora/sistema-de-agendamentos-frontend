'use client'

import { useState } from 'react'

export function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  }
}
