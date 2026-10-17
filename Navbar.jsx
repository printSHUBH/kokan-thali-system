import { Menu, Search, Shell, ShoppingBag, X } from 'lucide-react'

export default function Navbar({ cartCount, search, setSearch, onCart }) {
  const [open, setOpen] = React.useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <>
      <div className="announcement"><span>✦</span> A little taste of the Konkan coast, delivered to your door. <span>✦</span></div>
      <header className="navbar-wrap">
        <nav className="navbar container" aria-label="Primary navigation">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Kokan Thali home">
            <span className="brand-mark"><Shell size={19} strokeWidth={1.8} /></span>
            <span><strong>KOKAN</strong><em>THALI</em></span>
          </a>
          <div className={`nav-links ${open ? 'is-open' : ''}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#menu" onClick={closeMenu}>Food Menu</a>
            <a href="#story" onClick={closeMenu}>Our Story</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
          <div className="nav-actions">
            <label className="nav-search">
              <Search size={17} />
              <input aria-label="Search food menu" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" />
            </label>
            <button className="cart-trigger" onClick={onCart} aria-label={`Open cart with ${cartCount} items`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
            <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

import React from 'react'
