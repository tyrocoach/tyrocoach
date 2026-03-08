'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './SiteHeader.module.css'

const NAV_ITEMS = [
  {
    label: 'Practices',
    href: '/practices',
    children: [
      { label: 'Games', href: '/practices/games' },
      { label: 'Plans', href: '/practices/plans' },
    ],
  },
  {
    label: 'Game Day',
    href: '/game-day',
  },
  {
    label: 'Season',
    href: '/season',
    children: [
      { label: 'Philosophy', href: '/season/philosophy' },
      { label: 'Dealing with Parents', href: '/season/dealing-with-parents' },
    ],
  },
  {
    label: 'Parents',
    href: '/parents',
  },
  {
    label: 'Shopping',
    href: '/shopping',
  },
]

export default function SiteHeaderClient() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeParent, setActiveParent] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) closeButtonRef.current?.focus()
  }, [menuOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const openMenu = () => {
    setMenuOpen(true)
    setActiveParent(null)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setActiveParent(null)
  }

  return (
    <>
    <header
      role="banner"
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      {/* ── Desktop Row 1: Utility bar ── */}
      <div className={styles.utilityBar}>
        <div className={`container-wide ${styles.utilityInner}`}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="TyroCoach"
              width={140}
              height={40}
              priority
              style={{ height: 'auto' }}
            />
          </Link>
          <button className={styles.iconBtn} aria-label="Search">
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* ── Desktop Row 2: Main nav bar ── */}
      <div className={styles.navBar}>
        <nav aria-label="Main navigation">
          <div className={`container-wide ${styles.navInner}`}>
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${pathname.startsWith(item.href) ? styles.navLinkActive : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  aria-haspopup={item.children ? 'true' : undefined}
                >
                  {item.label.toUpperCase()}
                </Link>
                {item.children && (
                  <div className={styles.dropdown} role="menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.dropdownLink}
                        role="menuitem"
                        aria-current={pathname === child.href ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* ── Mobile / Tablet: Single row ── */}
      <div className={styles.mobileBar}>
        <button
          className={styles.iconBtn}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={openMenu}
        >
          <HamburgerIcon />
        </button>
        <Link href="/" className={styles.mobileLogo}>
          <Image
            src="/logo.svg"
            alt="TyroCoach"
            width={120}
            height={34}
            priority
            style={{ height: 'auto' }}
          />
        </Link>
        <button className={styles.iconBtn} aria-label="Search">
          <SearchIcon />
        </button>
      </div>
    </header>

    {/* ── Backdrop (tablet only) — outside <header> to escape stacking context ── */}
    {menuOpen && (
      <div
        className={styles.backdrop}
        onClick={closeMenu}
        aria-hidden="true"
      />
    )}

    {/* ── Drawer / Overlay — outside <header> to escape stacking context ── */}
    <div
      className={styles.drawer}
      style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!menuOpen}
      role="dialog"
    >
      <div className={styles.drawerHeader}>
        <button
          ref={closeButtonRef}
          className={styles.iconBtn}
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <CloseIcon />
        </button>
      </div>

      {activeParent === null ? (
        <>
          <div className={styles.drawerSearch}>
            <input
              type="search"
              placeholder="Search..."
              className={styles.searchInput}
              aria-label="Search"
            />
          </div>
          <nav aria-label="Mobile navigation">
            <ul className={styles.drawerNav}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={styles.drawerNavItem}>
                  {item.children ? (
                    <button
                      className={styles.drawerNavBtn}
                      onClick={() => setActiveParent(item.label)}
                      aria-haspopup="true"
                    >
                      <span>{item.label.toUpperCase()}</span>
                      <ChevronIcon />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.drawerNavLink}
                      onClick={closeMenu}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.label.toUpperCase()}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : (
        (() => {
          const parent = NAV_ITEMS.find((i) => i.label === activeParent)!
          return (
            <>
              <div className={styles.drawerBack}>
                <button
                  className={styles.backBtn}
                  onClick={() => setActiveParent(null)}
                >
                  <BackIcon />
                  {parent.label.toUpperCase()}
                </button>
              </div>
              <nav aria-label={`${parent.label} sub-navigation`}>
                <ul className={styles.drawerNav}>
                  {parent.children?.map((child) => (
                    <li key={child.href} className={styles.drawerNavItem}>
                      <Link
                        href={child.href}
                        className={styles.drawerNavLink}
                        onClick={closeMenu}
                        aria-current={pathname === child.href ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )
        })()
      )}
    </div>
    </>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
