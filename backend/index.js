import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API route as required by constraints (Node.js backend)
app.get('/api/profile', (req, res) => {
    res.json({
        name: "Yash Bana",
        title: "Designer · Developer · Creator",
        about: "A developer who steals hearts through bold interfaces and sharp code. Obsessed with motion, typography, and making experiences that feel like a whole vibe.",
        projects: 47,
        years: "5+"
    });
});

app.listen(PORT, () => {
    console.log(`Node.js backend server listening on port ${PORT}`);
});
