const crypto = require('crypto');

class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }
  // Calculate Hash Block using SHA256 (Secure Hash Algorithm 256) 
  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce)
      .digest('hex');
  }
  /* This function performs Proof-of-Work by mining the block It keeps changing the nonce until the hash starts with a number of leading zeros equal to the difficulty*/

  mineBlock(difficulty) {
    // Keep looping until the hash starts with 'difficulty' number of zeros
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;  // Increment nonce to try a new hash
      this.hash = this.calculateHash();  // Recalculate hash with new nonce
    }
    console.log(`Block mined: ${this.hash}`);
  }
}

class Blockchain {
  constructor() {
    // Create the blockchain with the first Genesis block
    this.chain = [this.createGenesisBlock()];
    // Set the mining difficulty (number of leading zeros required in hash)
    this.difficulty = 2;
  }
  // Creates and returns the first block of the blockchain (Genesis Block)
  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), "Genesis Block", "0");
  }
  // Returns the most recently added block in the blockchain
  getLatestBlock() {
    return this.chain[this.chain.length - 1]; // last block in the array
  }
  // Adds a new block to the blockchain
  addBlock(newBlock) {
    // Set the previousHash of the new block to the hash of the latest block
    newBlock.previousHash = this.getLatestBlock().hash;
    // Perform proof-of-work by mining the block using the set difficulty
    newBlock.mineBlock(this.difficulty);
    // Add the mined block to the blockchain
    this.chain.push(newBlock);
  }
  // This method checks if the blockchain has been tampered with or is still valid
  isChainValid() {
    // Start from the second block (index 1) because the first block is the Genesis block
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];       // Current block
      const previous = this.chain[i - 1];  // Previous block
      /*Recalculate the hash of the current block and check if it matches the stored hash If someone has changed the block data, the hash will be different */
      if (current.hash !== current.calculateHash()) return false;
      /*Check if the current block's previousHash matches the actual hash of the previous block If this doesn't match, it means the chain was broken*/
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

// Create a new blockchain instance with the Genesis block [Block 0 (Also a Genesis Block)]
let myChain = new Blockchain();
// Add a new block with transaction data amount: 999 [Block 1]
myChain.addBlock(new Block(1, new Date().toISOString(), { amount: 999 }));
// Add another block with transaction data amount: 50 [Block 2]
myChain.addBlock(new Block(2, new Date().toISOString(), { amount: 50 }));
// Print the full blockchain as a nicely formatted JSON string
console.log(JSON.stringify(myChain, null, 2));

// Check if the blockchain is still valid (should return true)
console.log("Blockchain valid?", myChain.isChainValid());

// Manually change transaction data in block 1
myChain.chain[1].transactions = { amount: 999 };
// Check again if the blockchain is valid after tampering
console.log("After tampering, valid?", myChain.isChainValid());

module.exports = {
  Block,
  Blockchain,
};
