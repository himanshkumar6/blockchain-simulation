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
]
```
### POST /api/mine
Returns the entire blockchain.

*Response:*
```json
{
  "transaction": {
    "from": "Alice",
    "to": "Bob",
    "amount": 50
  }
}

```
*Response:*
```json
{
  "message": "Block mined successfully",
  "block": {
    "index": 2,
    "timestamp": "...",
    "transactions": {
      "from": "Alice",
      "to": "Bob",
      "amount": 50
    },
    "previousHash": "...",
    "hash": "...",
    "nonce": "..."
  }
}

```
![Screenshot 2025-04-08 003632](https://github.com/user-attachments/assets/dacc0618-39ef-4bf6-8081-98d37224ee44)

![Screenshot 2025-04-07 224947](https://github.com/user-attachments/assets/cb985552-b9ec-47ea-97f4-5f5989da0969)

![Screenshot 2025-04-07 225001](https://github.com/user-attachments/assets/d86f5232-886a-4e53-b41e-79fc2b9ee7af)


