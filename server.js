import express from 'express';
import { createServer } from 'http';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
app.use(express.static(__dirname + "/src"));
server.listen(port, () => console.log(`Server listening on port ${port}`));

