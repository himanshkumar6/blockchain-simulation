# Simple Blockchain Web App

This is a full-stack demo blockchain application built using *Node.js (Express)* for backend and *React (Vite)* for frontend. It showcases how a basic blockchain works and allows users to mine new blocks with transaction data in real-time.

## Features

- Custom blockchain logic implemented from scratch
- Express API to:
  - Get the blockchain
  - Mine new blocks with dummy transactions
- React frontend to:
  - Submit transactions
  - Visualize the blockchain as a series of blocks
- Clean, modular codebase
- Docker-ready (multi-container setup for backend, frontend, and optional MongoDB if extended)

---

## Tech Stack

- *Frontend:* React (Vite), Axios
- *Backend:* Node.js, Express
- *Blockchain Logic:* Custom in Blockchain.js
- *Others:* Docker, CORS, Postman tested

---

## API Endpoints

### GET /api/chain
Returns the entire blockchain.

*Response:*
```json
[
  {
    "index": 0,
    "timestamp": "...",
    "transactions": "Genesis Block",
    "previousHash": "0",
    "hash": "...",
    "nonce": "0"
  },
  ...
]
