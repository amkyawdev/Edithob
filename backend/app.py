"""
Program Try App - Python Backend
Gradio version for HuggingFace Spaces
"""

import gradio as gr
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import os

# Models
class Project(BaseModel):
    id: str
    name: str
    type: str
    content: Optional[str] = ""

class CodeRequest(BaseModel):
    language: str
    code: str

# In-memory storage
projects_db = {}

# API
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Program Try App API", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Gradio Interface
def process_code(language: str, code: str):
    return f"Processed {language} code: {code[:100]}..."

with gr.Blocks(title="Program Try App") as demo:
    gr.Markdown("# Program Try App API")
    gr.Markdown("Backend အတွက် ပါပါ။")
    
    with gr.Tab("Process Code"):
        lang_input = gr.Dropdown(
            choices=["HTML", "CSS", "JavaScript", "Python", "React", "Next.js"],
            label="Language"
        )
        code_input = gr.Textbox(label="Code", lines=10)
        submit_btn = gr.Button("Process")
        output = gr.Textbox(label="Output", lines=10)
        submit_btn.click(process_code, inputs=[lang_input, code_input], outputs=output)

    with gr.Tab("Projects"):
        gr.Markdown("Projects စားလုံးယူပါပါ။")

demo.launch(server_name="0.0.0.0", server_port=7860)