import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import router from "./controllers/routes/index";

dotenv.config({ path: path.join(__dirname, '../.env') });

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup data base connection
mongoose.connect

// setup routes
app.use('/', router);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind} at address ${JSON.stringify(addr)}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
