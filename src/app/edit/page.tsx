'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function EditContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const projectId = searchParams.get('id')
  
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('html')
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    if (!projectId) return
    
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const project = projects.find((p: { id: string }) => p.id === projectId)
    
    if (project) {
      setProjectName(project.name)
      const savedCode = localStorage.getItem(`code_${projectId}`)
      setCode(savedCode || `<!DOCTYPE html>
<html>
<head>
  <title>${project.name}</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>`)
    }
  }, [projectId])

  const saveCode = () => {
    if (projectId) {
      localStorage.setItem(`code_${projectId}`, code)
      alert('သိမ်းပါပါ။')
    }
  }

  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
  ]

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
            <Link href="/main" className="nav-link btn-sm me-2">
              <i className="bi bi-arrow-left me-1"></i>
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Editor Header */}
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <i className="bi bi-pencil me-2"></i>
            {projectName}
          </h5>
          <div className="d-flex gap-2 align-items-center">
            <select
              className="form-select form-select-sm bg-dark text-light border-dark"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: 'auto' }}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <button className="btn btn-light btn-sm" onClick={saveCode}>
              <i className="bi bi-save me-1"></i>
              Save
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <textarea
          className="form-control form-control-dark"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            minHeight: '60vh',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            resize: 'vertical',
          }}
          spellCheck={false}
        />

        {/* Preview */}
        <div className="mt-4">
          <h6 className="mb-3">
            <i className="bi bi-play me-2"></i>
            Preview
          </h6>
          <div 
            className="card card-dark"
            style={{ minHeight: '300px' }}
          >
            <div className="card-body p-0">
              {language === 'html' && (
                <iframe
                  srcDoc={code}
                  className="w-100 h-100"
                  style={{ border: 'none', minHeight: '300px' }}
                  sandbox="allow-scripts"
                />
              )}
              {language !== 'html' && (
                <div className="p-3 text-muted-custom">
                  <i className="bi bi-info-circle me-2"></i>
                  {language} code preview မရှိပါ။ အခွေးယူပါပါ။
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav d-flex">
        <Link href="/" className="nav-item">
          <i className="bi bi-house d-block"></i>
          <small>Home</small>
        </Link>
        <Link href="/main" className="nav-item active">
          <i className="bi bi-folder d-block"></i>
          <small>Projects</small>
        </Link>
        <Link href="/about" className="nav-item">
          <i className="bi bi-info-circle d-block"></i>
          <small>About</small>
        </Link>
      </nav>
    </div>
  )
}

export default function Edit() {
  return (
    <Suspense fallback={<div className="p-3">Loading...</div>}>
      <EditContent />
    </Suspense>
  )
}