# Program Try App (Edithob)

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=for-the-badge&logo=python)
 ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap)
 ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern web application for trying and practicing programming with a built-in code editor.

## ပါးလမ်း

**Program Try App** သည် ပရိုဂရမ်းမင်းစားလုံးယူပါပါ။ Next.js နှင့် Python FastAPI တည်ဆောက်ပါပါ။

## Features

- 🌙 **Dark Theme** - Black/Gray theme
- 📱 **Responsive Design** - Mobile & Desktop
- 💻 **Code Editor** - HTML, CSS, JS, Python, React, Next.js
- 📁 **Project Management** - Create, Edit, Delete
- 🔄 **Local Storage** - Browser-based storage
- 🎨 **Bootstrap 5** - Modern UI framework

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icons

### Backend
- [Python](https://www.python.org/) - Programming language
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework
- [Uvicorn](https://www.uvicorn.org/) - ASGI server

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm ဒါမှမဟုတ် yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/Edithob.git
cd Edithob
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

## 📁 Project Structure

```
Edithob/
├── src/
│   └── app/
│       ├── page.tsx          # Get Started page
│       ├── layout.tsx        # Root layout
│       ├── globals.css       # Global styles
│       ├── main/
│       │   └── page.tsx      # Main Dashboard
│       ├── edit/
│       │   └── page.tsx      # Code Editor
│       └── about/
│           └── page.tsx      # About page
├── backend/
│   ├── main.py              # FastAPI backend
│   └── requirements.txt     # Python dependencies
├── package.json
├── tsconfig.json
└── README.md
```

## 📱 Responsive Design

| Device | Navigation |
|--------|------------|
| Mobile | Bottom Navigation Bar |
| Desktop | Top Navbar |

## 🔧 API Endpoints

### Backend API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint |
| GET | `/health` | Health check |
| POST | `/api/projects` | Create project |
| GET | `/api/projects` | List projects |
| GET | `/api/projects/{id}` | Get project |
| DELETE | `/api/projects/{id}` | Delete project |
| POST | `/api/process` | Process code |
| GET | `/api/files` | List files |

## 🌍 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (HuggingFace Spaces)

```bash
# Install HuggingFace Spaces SDK
pip install huggingface_spaces

# Create space
huggingface-cli create-space Edithob --title Edithob

# Push to Spaces
git push hf main
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**AMKyawDev**
- GitHub: [@amkyawdev](https://github.com/amkyawdev)

---

<div align="center">

Made with ❤️ by [AMKyawDev](https://github.com/amkyawdev)

</div>