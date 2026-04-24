'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Project {
  id: string
  name: string
  type: string
}

export default function Main() {
  const pathname = usePathname()
  const [projects, setProjects] = useState<Project[]>([])
  const [newProjectName, setNewProjectName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [editName, setEditName] = useState('')

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem('projects', JSON.stringify(newProjects))
  }

  const addProject = () => {
    if (!newProjectName.trim()) return
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      type: 'html',
    }
    saveProjects([...projects, newProject])
    setNewProjectName('')
    setIsModalOpen(false)
  }

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(p => p.id !== id)
    saveProjects(newProjects)
  }

  const openEditModal = (project: Project) => {
    setEditProject(project)
    setEditName(project.name)
  }

  const updateProject = () => {
    if (!editProject || !editName.trim()) return
    
    const newProjects = projects.map(p => 
      p.id === editProject.id ? { ...p, name: editName } : p
    )
    saveProjects(newProjects)
    setEditProject(null)
    setEditName('')
  }

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

      {/* Main Content */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            <i className="bi bi-folder me-2"></i>
            Projects
          </h4>
          <button 
            className="btn btn-light btn-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Project
          </button>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-folder text-muted" style={{ fontSize: '3rem' }}></i>
            <p className="text-muted-custom mt-3">ပရိုဂရမ်းမင်းမရှိပါ။</p>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Project
            </button>
          </div>
        ) : (
          <div className="row g-3">
            {projects.map(project => (
              <div key={project.id} className="col-6 col-md-4 col-lg-3">
                <div className="card card-dark h-100">
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title mb-3">
                      <i className="bi bi-code-slash me-2"></i>
                      {project.name}
                    </h6>
                    <div className="mt-auto d-flex gap-2">
                      <Link 
                        href={`/edit?id=${project.id}`}
                        className="btn btn-outline-light btn-sm flex-fill"
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </Link>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (confirm('ဖျက်လိုပါသလား?')) {
                            deleteProject(project.id)
                          }
                        }}
                      >
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

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog">
            <div className="modal-content modal-dark">
              <div className="modal-header modal-header-dark">
                <h5 className="modal-title">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Project
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control form-control-dark"
                  placeholder="Project Name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addProject()}
                />
              </div>
              <div className="modal-footer modal-footer-dark">
                <button 
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-light btn-sm"
                  onClick={addProject}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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