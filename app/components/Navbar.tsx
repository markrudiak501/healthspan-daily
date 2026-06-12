'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-gray-900">Healthspan Daily</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a href="#tools" className="text-gray-600 hover:text-gray-900 transition-colors">Tools</a>
          <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors">Products</a>
          <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</a>

          {/* X Icon */}
          <a 
            href="https://x.com/HealthspanDaily" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Follow Healthspan Daily on X"
            className="text-gray-600 hover:text-gray-900 transition-colors p-1 -mr-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25l-7.451 8.502L4.5 2.25H1.5l7.5 8.5L1.5 21.75h3l6.75-7.5 6.75 7.5h3l-7.5-8.5 7.5-8.5h-3z"/>
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6h12v12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            <a href="#tools" className="text-gray-600 hover:text-gray-900 py-1" onClick={closeMenu}>Tools</a>
            <a href="#products" className="text-gray-600 hover:text-gray-900 py-1" onClick={closeMenu}>Products</a>
            <a href="#resources" className="text-gray-600 hover:text-gray-900 py-1" onClick={closeMenu}>Resources</a>
            
            <div className="pt-2 border-t border-gray-100">
              <a 
                href="https://x.com/HealthspanDaily" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 py-1"
                onClick={closeMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25l-7.451 8.502L4.5 2.25H1.5l7.5 8.5L1.5 21.75h3l6.75-7.5 6.75 7.5h3l-7.5-8.5 7.5-8.5h-3z"/>
                </svg>
                <span>Follow on X</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}