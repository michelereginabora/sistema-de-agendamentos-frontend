export interface NavigationLink {
    href: string
    label: string
  }
  
  export interface MenuProps {
    links: NavigationLink[]
  }
  
  export interface MobileMenuProps extends MenuProps {
    isOpen: boolean
    onLinkClick: () => void
  }
  
  export interface MenuIconProps {
    isOpen: boolean
  }
  