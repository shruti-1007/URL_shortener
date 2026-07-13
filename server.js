const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const connectDB = require('./db/db');
const PORT = process.env.PORT || 3000;
const URL = require('./models/urlModel');
const urlRoutes = require('./routes/url');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/url', urlRoutes);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},
        { $push: { visitHistory: { timestamp: Date.now() } } },     
    );
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(entry.redirectUrl);
});

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})