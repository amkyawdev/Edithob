'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface ProjectFile {
  name: string
  content: string
  type: 'html' | 'css' | 'js'
}

interface Project {
  id: string
  name: string
  type: string
  files: ProjectFile[]
}

function EditContent() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('id')
  
  const [project, setProject] = useState<Project | null>(null)
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [currentCode, setCurrentCode] = useState('')
  const [language, setLanguage] = useState<'html' | 'css' | 'js'>('html')

  useEffect(() => {
    if (!projectId) return
    
    const savedProjects = localStorage.getItem('edithob_projects')
    if (savedProjects) {
      const projects: Project[] = JSON.parse(savedProjects)
      const foundProject = projects.find(p => p.id === projectId)
      
      if (foundProject) {
        setProject(foundProject)
        setFiles(foundProject.files)
        
        // Select first file by default
        if (foundProject.files.length > 0) {
          setCurrentFileIndex(0)
          setCurrentCode(foundProject.files[0].content)
          setLanguage(foundProject.files[0].type)
        }
      }
    }
  }, [projectId])

  const updateFileContent = (index: number, content: string) => {
    const updatedFiles = [...files]
    updatedFiles[index] = { ...updatedFiles[index], content }
    setFiles(updatedFiles)
  }

  const saveProject = () => {
    if (!projectId) return
    
    const savedProjects = localStorage.getItem('edithob_projects')
    if (savedProjects) {
      const projects: Project[] = JSON.parse(savedProjects)
      const updatedProjects = projects.map(p => 
        p.id === projectId ? { ...p, files } : p
      )
      localStorage.setItem('edithob_projects', JSON.stringify(updatedProjects))
      alert('သိမ်းပါပါ။')
    }
  }

  const getLanguageFromFileName = (filename: string): 'html' | 'css' | 'js' => {
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.js')) return 'js'
    return 'html'
  }

  const getFileIcon = (type: 'html' | 'css' | 'js') => {
    switch(type) {
      case 'css': return 'bi-braces'
      case 'js': return 'bi-braces'
      default: return 'bi-filetype-html'
    }
  }

  const generatePreviewHTML = () => {
    let html = ''
    const htmlFile = files.find(f => f.name === 'index.html')
    const cssFile = files.find(f => f.name.endsWith('.css'))
    const jsFile = files.find(f => f.name.endsWith('.js'))
    
    if (htmlFile) {
      html = htmlFile.content
      
      // Inject CSS
      if (cssFile) {
        const styleTag = `<style>${cssFile.content}</style>`
        html = html.replace('</head>', `${styleTag}</head>`)
      }
      
      // Inject JS
      if (jsFile) {
        const scriptTag = `<script>${jsFile.content}<\/script>`
        html = html.replace('</body>', `${scriptTag}</body>`)
      }
    }
    
    return html
  }

  if (!project) {
    return (
      <div className="main-content">
        <div className="container py-5 text-center">
          <p>Project not found</p>
          <Link href="/main" className="btn btn-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i>Back
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <nav className="top-navbar navbar navbar-dark sticky-top">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <i className="bi bi-code-slash me-2"></i>Program Try App
          </Link>
          <div className="navbar-nav ms-auto flex-row">
            <Link href="/main" className="nav-link btn-sm me-2">
              <i className="bi bi-arrow-left me-1"></i>Back
            </Link>
            <button className="btn btn-light btn-sm" onClick={saveProject}>
              <i className="bi bi-save me-1"></i>Save
            </button>
          </div>
        </div>
      </nav>

      {/* Editor Container */}
      <div className="container-fluid py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <i className="bi bi-pencil me-2"></i>{project.name}
          </h5>
          <small className="text-muted-custom">{files.length} files</small>
        </div>

        <div className="row g-3">
          {/* File List Sidebar */}
          <div className="col-md-2">
            <div className="card card-dark">
              <div className="card-header">
                <small>Files</small>
              </div>
              <div className="list-group list-group-flush">
                {files.map((file, index) => (
                  <button
                    key={index}
                    className={`list-group-item list-group-item-action ${index === currentFileIndex ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentFileIndex(index)
                      setCurrentCode(file.content)
                      setLanguage(file.type)
                    }}
                  >
                    <i className={`bi ${getFileIcon(file.type)} me-2`}></i>
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="col-md-10">
            <div className="card card-dark">
              <div className="card-header d-flex justify-content-between align-items-center">
                <small>
                  <i className={`bi ${getFileIcon(language)} me-2`}></i>
                  {files[currentFileIndex]?.name || 'No file'}
                </small>
                <select
                  className="form-select form-select-sm bg-dark text-light border-dark"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'html' | 'css' | 'js')}
                  style={{ width: 'auto' }}
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="js">JavaScript</option>
                </select>
              </div>
              <div className="card-body p-0">
                <textarea
                  className="form-control form-control-dark border-0"
                  value={currentCode}
                  onChange={(e) => {
                    setCurrentCode(e.target.value)
                    updateFileContent(currentFileIndex, e.target.value)
                  }}
                  style={{
                    minHeight: '50vh',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    resize: 'vertical',
                  }}
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="card card-dark mt-3">
              <div className="card-header">
                <small><i className="bi bi-play me-2"></i>Preview</small>
              </div>
              <div className="card-body p-0">
                <iframe
                  srcDoc={generatePreviewHTML()}
                  className="w-100"
                  style={{ 
                    border: 'none', 
                    minHeight: '400px',
                    background: '#fff'
                  }}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav d-flex">
        <Link href="/" className="nav-item">
          <i className="bi bi-house d-block"></i><small>Home</small>
        </Link>
        <Link href="/main" className="nav-item active">
          <i className="bi bi-folder d-block"></i><small>Projects</small>
        </Link>
        <Link href="/about" className="nav-item">
          <i className="bi bi-info-circle d-block"></i><small>About</small>
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