Sure, here is a `README.md` file for your project:

---

# Manga Reading Site

A web application for reading and managing manga, built with Django for the backend and React for the frontend.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
  - [Development Server](#development-server)

## Requirements

### Hardware Requirements:
- **Processor:** Minimum 2 GHz dual-core processor.
- **Memory:** Minimum 4 GB RAM (8 GB RAM recommended).
- **Storage:** Minimum 500 MB of free disk space.
- **Graphics Card:** Compatible with DirectX 9 or newer.
- **Monitor:** Resolution of at least 1024x768 pixels.

### Software Requirements:
- **Operating System:** Windows 10 or newer, Linux (64-bit), macOS 10.14 or newer.
- **Python:** Version 3.8 or newer.
- **Node.js:** Version 14 or newer.
- **NPM or Yarn:** Node.js package manager.
- **Git:** For version control and cloning the repository.

## Installation

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:GitGutGut/Manga-site.git
   cd manga-reading-site/backend
   ```

2. **Create and activate a virtual environment:**
   - **Windows:**
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **Linux/macOS:**
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser:**
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

### Development Server

#### Backend:
1. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     .\venv\Scripts\activate
     ```
   - **Linux/macOS:**
     ```bash
     source venv/bin/activate
     ```

2. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```

#### Frontend:
1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Start the React development server:**
   ```bash
   npm start
   ```


---

 
