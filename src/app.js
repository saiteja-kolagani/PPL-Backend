const dotenv = require('dotenv')

const express = require('express');
const app = express();

dotenv.config()

app.use(express.json());

const authRoutes = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments');

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));