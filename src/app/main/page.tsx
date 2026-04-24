'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export default function Main() {
  const pathname = usePathname()
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)

  // New Project Form
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectType, setNewProjectType] = useState('html')
  
  // Upload State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadProjectName, setUploadProjectName] = useState('')

  useEffect(() => {
    const savedProjects = localStorage.getItem('edithob_projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem('edithob_projects', JSON.stringify(newProjects))
  }

  // Create New Project with default files
  const createNewProject = () => {
    if (!newProjectName.trim()) return
    
    const defaultFiles: ProjectFile[] = [
      { name: 'index.html', content: getDefaultHTML(newProjectType), type: 'html' },
      { name: 'style.css', content: getDefaultCSS(), type: 'css' },
      { name: 'script.js', content: getDefaultJS(), type: 'js' },
    ]
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      type: newProjectType,
      files: defaultFiles,
    }
    saveProjects([...projects, newProject])
    setNewProjectName('')
    setNewProjectType('html')
    setIsModalOpen(false)
  }

  const getDefaultHTML = (type: string) => {
    switch(type) {
      case 'html':
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${newProjectName || 'My Project'}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>Welcome to ${newProjectName || 'My Project'}</p>
    <script src="script.js"></script>
</body>
</html>`
      case 'react':
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${newProjectName || 'React App'}</title>
</head>
<body>
    <div id="root"></div>
    <script src="script.js"></script>
</body>
</html>`
      default:
        return `<!DOCTYPE html>
<html>
<head><title>${newProjectName}</title></head>
<body><h1>${newProjectName}</h1></body>
</html>`
    }
  }

  const getDefaultCSS = () => {
    return `/* ${newProjectName || 'My Project'} Styles */
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 0;
    background: #1a1a1a;
    color: #fff;
}

h1 {
    color: #4CAF50;
}`
  }

  const getDefaultJS = () => {
    return `// ${newProjectName || 'My Project'} Script
console.log('Welcome to ${newProjectName || 'My Project'}!');
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded!');
});`
  }

  // Upload Project from folder/files
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles: ProjectFile[] = []
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const ext = file.name.split('.').pop()?.toLowerCase() as 'html' | 'css' | 'js'
        
        if (ext === 'html' || ext === 'css' || ext === 'js') {
          newFiles.push({
            name: file.name,
            content: content,
            type: ext,
          })
        }
        
        if (newFiles.length === files.length) {
          // Ensure index.html exists
          if (!newFiles.find(f => f.name === 'index.html')) {
            newFiles.unshift({
              name: 'index.html',
              content: '<!DOCTYPE html>\n<html>\n<head><title>My Project</title></head>\n<body><h1>Upload Success!</h1></body>\n</html>',
              type: 'html',
            })
          }
        }
      }
      reader.readAsText(file)
    })
  }

  const uploadProject = () => {
    if (!uploadProjectName.trim()) return
    
    const defaultFiles: ProjectFile[] = [
      { name: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head><title>' + uploadProjectName + '</title></head>\n<body><h1>Upload Success!</h1></body>\n</html>', type: 'html' },
    ]
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: uploadProjectName,
      type: 'html',
      files: defaultFiles,
    }
    saveProjects([...projects, newProject])
    setUploadProjectName('')
    setIsUploadModalOpen(false)
  }

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(p => p.id !== id)
    saveProjects(newProjects)
  }

  const openEditModal = (project: Project) => {
    setEditProject(project)
  }

  const updateProject = () => {
    if (!editProject) return
    const newProjects = projects.map(p => 
      p.id === editProject.id ? { ...p, name: editProject.name } : p
    )
    saveProjects(newProjects)
    setEditProject(null)
  }

  return (
    <div className="main-content">
      {/* Top Navbar */}
      <nav className="top-navbar navbar navbar-dark sticky-top">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <i className="bi bi-code-slash me-2"></i>
            Program Try App
          </Link>
          <div className="navbar-nav ms-auto flex-row">
            <Link href="/" className={`nav-link btn-sm me-2 ${pathname === '/' ? 'active' : ''}`}>
              <i className="bi bi-house me-1"></i>Home
            </Link>
            <Link href="/main" className={`nav-link btn-sm me-2 ${pathname === '/main' ? 'active' : ''}`}>
              <i className="bi bi-folder me-1"></i>Projects
            </Link>
            <Link href="/about" className={`nav-link btn-sm ${pathname === '/about' ? 'active' : ''}`}>
              <i className="bi bi-info-circle me-1"></i>About
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            <i className="bi bi-folder me-2"></i>Projects
          </h4>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => setIsUploadModalOpen(true)}>
              <i className="bi bi-upload me-1"></i>Upload
            </button>
            <button className="btn btn-light btn-sm" onClick={() => setIsModalOpen(true)}>
              <i className="bi bi-plus-circle me-1"></i>New Project
            </button>
          </div>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-folder text-muted" style={{ fontSize: '3rem' }}></i>
            <p className="text-muted-custom mt-3">ပရိုဂရမ်းမင်းမရှိပါ။</p>
            <button className="btn btn-light btn-sm me-2" onClick={() => setIsModalOpen(true)}>
              <i className="bi bi-plus-circle me-1"></i>New Project
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setIsUploadModalOpen(true)}>
              <i className="bi bi-upload me-1"></i>Upload
            </button>
          </div>
        ) : (
          <div className="row g-3">
            {projects.map(project => (
              <div key={project.id} className="col-6 col-md-4 col-lg-3">
                <div className="card card-dark h-100">
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title mb-3">
                      <i className="bi bi-code-slash me-2"></i>{project.name}
                    </h6>
                    <small className="text-muted-custom mb-2">
                      {project.files.length} files
                    </small>
                    <div className="mt-auto d-flex gap-2">
                      <Link href={`/edit?id=${project.id}`} className="btn btn-outline-light btn-sm flex-fill">
                        <i className="bi bi-pencil me-1"></i>Edit
                      </Link>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => {
                        if (confirm('ဖျက်လိုပါသလား?')) deleteProject(project.id)
                      }}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create New Project Modal */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog">
            <div className="modal-content modal-dark">
              <div className="modal-header modal-header-dark">
                <h5 className="modal-title"><i className="bi bi-plus-circle me-2"></i>New Project</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Project Name</label>
                  <input type="text" className="form-control form-control-dark" placeholder="My Project" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && createNewProject()} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select className="form-select form-control-dark" value={newProjectType} onChange={(e) => setNewProjectType(e.target.value)}>
                    <option value="html">HTML</option>
                    <option value="react">React</option>
                    <option value="js">JavaScript</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer modal-footer-dark">
                <button className="btn btn-outline-light btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="btn btn-light btn-sm" onClick={createNewProject}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Project Modal */}
      {isUploadModalOpen && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog">
            <div className="modal-content modal-dark">
              <div className="modal-header modal-header-dark">
                <h5 className="modal-title"><i className="bi bi-upload me-2"></i>Upload Project</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsUploadModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Project Name</label>
                  <input type="text" className="form-control form-control-dark" placeholder="My Project" value={uploadProjectName} onChange={(e) => setUploadProjectName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Files (HTML, CSS, JS)</label>
                  <input type="file" className="form-control form-control-dark" multiple accept=".html,.css,.js,.txt" onChange={handleFileUpload} />
                  <small className="text-muted-custom">index.html, style.css, script.js</small>
                </div>
              </div>
              <div className="modal-footer modal-footer-dark">
                <button className="btn btn-outline-light btn-sm" onClick={() => setIsUploadModalOpen(false)}>Cancel</button>
                <button className="btn btn-light btn-sm" onClick={uploadProject}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav d-flex">
        <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
          <i className="bi bi-house d-block"></i><small>Home</small>
        </Link>
        <Link href="/main" className={`nav-item ${pathname === '/main' ? 'active' : ''}`}>
          <i className="bi bi-folder d-block"></i><small>Projects</small>
        </Link>
        <Link href="/about" className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>
          <i className="bi bi-info-circle d-block"></i><small>About</small>
        </Link>
      </nav>
    </div>
  )
}