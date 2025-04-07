import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type Block = {
  index: number;
  timestamp: string;
  transactions: any;
  hash: string;
  previousHash: string;
  nonce: number;
};

function App() {
  const [chain, setChain] = useState<Block[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchChain = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/chain');
      setChain(res.data);
    } catch (error) {
      console.error('Error fetching chain:', error);
    }
  };

  const mineBlock = async () => {
    try {
      setLoading(true);

      if (!sender || !receiver || !amount) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      const txData = {
        sender,
        receiver,
        amount: parseFloat(amount),
      };

      if (typeof txData !== 'object' || txData === null || Array.isArray(txData)) {
        throw new Error("Transaction must be a JSON object");
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      await axios.post('http://localhost:5000/api/mine', {
        transaction: txData,
      });

      toast.success('Block mined successfully!');
      setSender('');
      setReceiver('');
      setAmount('');
      fetchChain();
    } catch (error) {
      console.error('Error mining block:', error);
      toast.error('Invalid transaction format');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChain();
  }, []);

  const tamperBlock = async (index: number) => {
    try {
      await axios.post(`http://localhost:5000/api/tamper/${index}`);
      toast.success(`Block ${index} has been tampered on the server`);
      fetchChain();
    } catch (err) {
      toast.error('Failed to tamper the block');
    }
  };

  const validateChain = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/validate');
      setIsValid(res.data.valid);
      toast(`Blockchain is ${res.data.valid ? 'VALID ✅' : 'INVALID ❌'}`);
      console.log(res);
    } catch (err) {
      toast.error('Error validating chain');
    }
  };

  return (
    <div className='bg-black'>
      <h1 className='text-center text-white text-4xl items-center py-4 font-bold md:text-4xl' style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>Blockchain Explorer</h1>

      <div className='text-center text-xl items-center py-1 mx-9'>
        <h2 className='mb-5 text-white font-semibold' style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>Mine New Block</h2>

        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className='bg-white rounded-sm text-center py-1 my-2 mx-3'
          placeholder='Sender Name'
        />

        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className='bg-white rounded-sm text-center py-1 my-2 mx-3'
          placeholder='Receiver Name'
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='bg-white rounded-sm text-center py-1 my-2 mx-3'
          placeholder='Amount'
        />
        <br />
        <button
          onClick={mineBlock}
          disabled={loading}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#00ffaa',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Mining...' : 'Mine Block'}
        </button>
      </div>

      <h2 className='text-xl md:text-3xl font-bold text-white my-3 md:mx-10' style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>📦 Blockchain Transactions</h2>
      <div>
        {chain.map((block, idx) => (
          <div
            key={idx}
            className='md:max-w-9/12 w-full text-white md:py-5 bg-slate-500 md:px-12 rounded-md my-8 md:text-base md:mx-10 text-[10px] p-5'
          >
            <p><strong>Index:</strong> {block.index}</p>
            <p><strong>Timestamp:</strong> {block.timestamp}</p>
            <p><strong>Transactions:</strong> {JSON.stringify(block.transactions)}</p>
            <p><strong>Hash:</strong> {block.hash}</p>
            <p><strong>Previous Hash:</strong> {block.previousHash}</p>
            <p><strong>Nonce:</strong> {block.nonce}</p>

            <button
              onClick={() => tamperBlock(idx)}
              style={{
                marginTop: '0.5rem',
                padding: '0.3rem 0.8rem',
                backgroundColor: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ⚠️ Tamper Block
            </button>
          </div>
        ))}
      </div>

      <div className='text-center py-10'>
        <button
          onClick={validateChain}
          className='bg-blue-500 py-3 px-3 font-bold rounded-md cursor-pointer'
        >
          Validate Blockchain
        </button>

        {isValid !== null && (
          <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: isValid ? 'lightgreen' : 'red' }}>
            Blockchain is {isValid ? 'VALID ✅' : 'INVALID ❌'}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;