'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function About() {
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

      {/* About Content */}
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card card-dark mb-4">
              <div className="card-body">
                <h4 className="mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  About Program Try App
                </h4>
                
                <div className="mb-4">
                  <h6>ပါးလမ်း</h6>
                  <p className="text-muted-custom">
                    ဤအပလီကေးရှင်းတည်ဆောက်ပါတယ်။
                    ပရိုဂရမ်းမင်းစားလုံးယူပါပါ။
                  </p>
                </div>

                <div className="mb-4">
                  <h6>နည်းပါး၊</h6>
                  <ul className="list-group list-group-dark">
                    <li className="list-group-item-dark">
                      <i className="bi bi-check2 me-2"></i>
                      Next.js (Frontend)
                    </li>
                    <li className="list-group-item-dark">
                      <i className="bi bi-check2 me-2"></i>
                      Bootstrap 5
                    </li>
                    <li className="list-group-item-dark">
                      <i className="bi bi-check2 me-2"></i>
                      Black & Gray Dark Theme
                    </li>
                    <li className="list-group-item-dark">
                      <i className="bi bi-check2 me-2"></i>
                      Responsive UI
                    </li>
                    <li className="list-group-item-dark">
                      <i className="bi bi-check2 me-2"></i>
                      Mobile Bottom Navigation
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h6>ဒေါင်းလုန်း</h6>
                  <p className="text-muted-custom">
                    GitHub: amkyawdev/Edithob
                  </p>
                </div>

                <div className="text-center">
                  <Link href="/main" className="btn btn-light btn-sm">
                    <i className="bi bi-rocket-takeoff me-2"></i>
                    စတင်ပါပါ။
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center text-muted-custom">
              <small>© 2024 Program Try App</small>
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