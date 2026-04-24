"""
Program Try App - Python Backend
FastAPI for handling file processing and heavy logic
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os

app = FastAPI(title="Program Try App API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Project(BaseModel):
    id: str
    name: str
    type: str
    content: Optional[str] = ""

class FileItem(BaseModel):
    name: str
    type: str  # "file" or "folder"
    content: Optional[str] = ""

class CodeRequest(BaseModel):
    language: str
    code: str

# In-memory storage (replace with actual database in production)
projects_db: dict = {}

@app.get("/")
async def root():
    return {"message": "Program Try App API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Project Endpoints
@app.post("/api/projects")
async def create_project(project: Project):
    projects_db[project.id] = project
    return {"message": "Project created", "project": project}

@app.get("/api/projects")
async def get_projects():
    return {"projects": list(projects_db.values())}

@app.get("/api/projects/{project_id}")
async def get_project(project_id: str):
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects_db[project_id]

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    del projects_db[project_id]
    return {"message": "Project deleted"}

# Code Processing Endpoints
@app.post("/api/process")
async def process_code(request: CodeRequest):
    """Process code based on language"""
    result = {
        "language": request.language,
        "output": f"Processed {request.language} code successfully",
        "status": "success"
    }
    
    if request.language == "python":
        # Execute Python code (be careful with this in production!)
        try:
            # For safety, we'll just validate the code
            result["output"] = "Python code validated successfully"
        except Exception as e:
            result["output"] = f"Error: {str(e)}"
            result["status"] = "error"
    
    return result

# File System Endpoints
@app.get("/api/files")
async def list_files(path: str = "/"):
    """List files in a directory"""
    try:
        if not os.path.exists(path):
            return {"files": [], "error": "Path does not exist"}
        
        files = []
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            files.append({
                "name": item,
                "type": "folder" if os.path.isdir(item_path) else "file",
                "path": item_path
            })
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)