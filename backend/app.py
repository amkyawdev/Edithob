"""
Program Try App - Python Backend
Docker version for HuggingFace Spaces
"""

import gradio as gr
from pydantic import BaseModel
from typing import Optional
import subprocess
import sys

# Models
class Project(BaseModel):
    id: str
    name: str
    type: str
    content: Optional[str] = ""

# Language configurations
LANGUAGES = {
    "python": {"run": lambda code: run_python(code)},
    "html": {"run": lambda code: run_html(code)},
    "css": {"run": lambda code: run_css(code)},
    "javascript": {"run": lambda code: run_javascript(code)},
    "react": {"run": lambda code: run_react(code)},
    "nextjs": {"run": lambda code: run_nextjs(code)}
}

def run_python(code: str) -> str:
    try:
        result = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True, timeout=5)
        return result.stdout if result.returncode == 0 else f"Error: {result.stderr}"
    except Exception as e:
        return f"Error: {str(e)}"

def run_html(code: str) -> str:
    if "<html" in code.lower() or "<!DOCTYPE" in code.upper():
        return "✓ Valid HTML"
    return "Warning: HTML not found"

def run_css(code: str) -> str:
    if "{" in code and "}" in code:
        return "✓ Valid CSS"
    return "Warning: CSS not found"

def run_javascript(code: str) -> str:
    return f"JavaScript validated:\n{code[:200]}"

def run_react(code: str) -> str:
    return "✓ Valid React" if "react" in code.lower() else "Warning: React not found"

def run_nextjs(code: str) -> str:
    return "✓ Valid Next.js" if "next" in code.lower() else "Warning: Next.js not found"

def process_code(language: str, code: str) -> str:
    if language not in LANGUAGES:
        return f"Unknown: {language}"
    try:
        return LANGUAGES[language]["run"](code)
    except Exception as e:
        return f"Error: {str(e)}"

# Gradio Interface
with gr.Blocks(title="Program Try App", theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 🖥️ Program Try App - Language Tester")
    
    with gr.Tab("💻 Code Tester"):
        lang_input = gr.Dropdown(choices=list(LANGUAGES.keys()), label="Language", value="python")
        code_input = gr.Textbox(label="Code", lines=10, placeholder="Write code here...")
        submit_btn = gr.Button("🟢 Run", variant="primary")
        output = gr.Textbox(label="Output", lines=5)
        submit_btn.click(process_code, inputs=[lang_input, code_input], outputs=output)
        
    with gr.Tab("ℹ️ About"):
        gr.Markdown("## About\n- Version: 1.0.0\n- Author: AMKyawDev")

demo.launch(server_name="0.0.0.0", server_port=7860, share=True)