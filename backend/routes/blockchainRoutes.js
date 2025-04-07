const express = require('express');
const router = express.Router();
const { Blockchain, Block } = require('/BlockChain/backend/blockchain');

const myChain = new Blockchain();

// GET /chain - return full blockchain
router.get('/chain', (req, res) => {
  res.json(myChain.chain);
});

// POST /mine - mine a new block with dummy transaction
router.post('/mine', (req, res) => {
  const { transaction } = req.body;

  if (!transaction) {
    return res.status(400).json({ error: "Transaction data required" });
  }

  const newBlock = new Block(
    myChain.chain.length,
    new Date().toISOString(),
    transaction
  );
  myChain.addBlock(newBlock);
  res.json({ message: "Block mined successfully", block: newBlock });
});


router.get('/validate', (req, res) => {
  const isValid = myChain.isChainValid();
  res.json({ valid: isValid });
});

router.post('/tamper/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (index <= 0 || index >= myChain.chain.length) {
    return res.status(400).json({ message: 'Invalid index to tamper' });
  }

  // Tamper with the block
  myChain.chain[index].transactions.amount = `999 is tampered data`;

  // ⚠️ Don't recalculate hash so the tampering can be detected
  res.json({ message: `Block ${index} tampered` });
});

module.exports = router;