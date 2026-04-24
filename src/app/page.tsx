'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathname = usePathname()

  return (
    <div className="main-content">
      {/* Top Navbar for Desktop */}
      <nav className="top-navbar navbar navbar-dark sticky-top">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <i className="bi bi-code-slash me-2"></i>
            Program Try App
          </Link>
          <div className="navbar-nav ms-auto flex-row">
            <Link 
              href="/" 
              className={`nav-link btn-sm me-2 ${pathname === '/' ? 'active' : ''}`}
            >
              <i className="bi bi-house me-1"></i>
              Home
            </Link>
            <Link 
              href="/main" 
              className={`nav-link btn-sm me-2 ${pathname === '/main' ? 'active' : ''}`}
            >
              <i className="bi bi-folder me-1"></i>
              Projects
            </Link>
            <Link 
              href="/about" 
              className={`nav-link btn-sm ${pathname === '/about' ? 'active' : ''}`}
            >
              <i className="bi bi-info-circle me-1"></i>
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container">
        <div className="row min-vh-100 align-items-center justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <h1 className="display-4 mb-4">
              <i className="bi bi-code-slash me-3"></i>
              Program Try App
            </h1>
            <p className="lead text-muted-custom mb-5">
              ပရိုဂရမ်းမင်းနဲ့ အပြည့်အဝ လက်တွေ့ပါပါ။
            </p>
            <div className="d-grid gap-2">
              <Link href="/main" className="btn btn-light btn-sm">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Get Started
              </Link>
              <Link href="/about" className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-info-circle me-2"></i>
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav d-flex">
        <Link 
          href="/" 
          className={`nav-item ${pathname === '/' ? 'active' : ''}`}
        >
          <i className="bi bi-house d-block"></i>
          <small>Home</small>
        </Link>
        <Link 
          href="/main" 
          className={`nav-item ${pathname === '/main' ? 'active' : ''}`}
        >
          <i className="bi bi-folder d-block"></i>
          <small>Projects</small>
        </Link>
        <Link 
          href="/about" 
          className={`nav-item ${pathname === '/about' ? 'active' : ''}`}
        >
          <i className="bi bi-info-circle d-block"></i>
          <small>About</small>
        </Link>
      </nav>
    </div>
  )
}