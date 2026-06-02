const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

// тут я просто затестить решил 
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', db: 'connected' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server on http://0.0.0.0:${PORT}`);
});