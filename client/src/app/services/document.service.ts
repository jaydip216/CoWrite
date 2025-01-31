import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private socket: Socket;
  private documentContent = new BehaviorSubject<string>('');

  constructor() {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('documentContent', (content: string) => {
      this.documentContent.next(content);
    });

    this.socket.on('documentUpdate', (content: string) => {
      this.documentContent.next(content);
    });
  }

  generateDocumentId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  joinDocument(documentId: string): void {
    this.socket.emit('joinDocument', documentId);
  }

  updateDocument(documentId: string, content: string): void {
    this.socket.emit('updateDocument', { documentId, content });
  }

  getContentStream(): Observable<string> {
    return this.documentContent.asObservable();
  }
}