const express = require('express');
const cors = require('cors');


const app = express();
const blockchainRoutes = require('./routes/blockchainRoutes');

app.use(cors());
app.use(express.json()); // to parse JSON body
app.use('/api', blockchainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Blockchain API running on port ${PORT}`);
});