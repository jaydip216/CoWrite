const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cowrite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Document Schema
const documentSchema = new mongoose.Schema({
  documentId: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
  lastModified: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', documentSchema);

io.on('connection', async (socket) => {
  console.log('Client connected');

  socket.on('joinDocument', async (documentId) => {
    socket.join(documentId);
    
    try {
      // Find document or create if it doesn't exist
      let doc = await Document.findOne({ documentId });
      if (!doc) {
        doc = await Document.create({ documentId, content: '' });
      }
      socket.emit('documentContent', doc.content);
    } catch (error) {
      console.error('Error joining document:', error);
      socket.emit('error', 'Error loading document');
    }
  });

  socket.on('updateDocument', async ({ documentId, content }) => {
    try {
      await Document.findOneAndUpdate(
        { documentId },
        { 
          content,
          lastModified: new Date()
        },
        { upsert: true }
      );
      
      // Broadcast to all clients in the room except sender
      socket.to(documentId).emit('documentUpdate', content);
    } catch (error) {
      console.error('Error updating document:', error);
      socket.emit('error', 'Error saving document');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});