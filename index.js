const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.json());

// RELATIVE FOLDER PATH
// http://localhost:8000/listFiles
// {
//     "folderPath": "../"
// }
app.post('/listFiles', (req, res) => {
    const folderPath = req.body.folderPath;
    
    if (!folderPath) {
        return res.status(400).json({ error: 'Missing folderPath in request body' });
    }
    
    const fullFolderPath = path.join(__dirname, folderPath);
    
    fs.readdir(fullFolderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading folder contents' });
        }
        
        res.json({ files });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
