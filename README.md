# 🌿 Whisper

**Whisper** is a lightweight, scalable backend built with **NestJS**, designed for **real-time messaging**, **advanced search**, and **high-performance caching**.
It integrates **MongoDB**, **Redis**, **Elasticsearch**, and **WebSockets**, and is fully **Dockerized** for easy deployment.

---

## ✨ Features

- 💬 **Real-time messaging** using WebSockets
- 📦 **MongoDB** as the primary NoSQL database
- ⚡ **Redis caching** for high-performance reads
- 🔎 **Elasticsearch** for full-text search and filtering
- 🧩 Modular and scalable architecture with NestJS
- 🐳 Fully **Dockerized** for consistent development and deployment

---

## 🛠 Tech Stack

- **Backend Framework:** NestJS
- **Database:** MongoDB
- **Caching:** Redis
- **Search Engine:** Elasticsearch
- **Real-time:** WebSockets
- **Containerization:** Docker

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/Whisper.git
cd Whisper
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Copy the example `.env.example` and update values:

```bash
cp .env.example .env
```

### 4. Run the app

```bash
npm run start:dev
```

The backend will run on [http://localhost:3000](http://localhost:3000).

---

## 🐳 Using Docker

1. Build the Docker image:

```bash
docker build -t whisper-backend .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env-file .env whisper-backend
```

---

## 📚 Project Structure

```
src/
├── app.module.ts        # Root module
├── main.ts              # Entry point
├── modules/             # Feature modules
│   ├── auth/            # Authentication module
│   ├── users/           # Users module
│   └── chat/            # Messaging/WebSocket module
├── common/              # Shared utilities, guards, pipes
└── config/              # Environment and configuration
```

---

## ⚡ Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the **MIT License**.
