const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ message: 'Name and address are required.' });
  }

  try {
    // Create the user and address
    const user = await db.User.create({ name });
    const userAddress = await db.Address.create({ address, userId: user.id });

    res.json({ message: 'Data saved successfully', user, userAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
