import { Injectable } from '@angular/core';
import { Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private connection: any;

    private subscription: StompSubscription | undefined;
    public content: string = "";

    constructor() {
        this.initializeWebSocketConnection();
    }

    private initializeWebSocketConnection(): void {
        try {
            let ws = new SockJS('http://localhost:8080/v1/cowrite');
            this.connection = Stomp.over(ws);
            this.connection.connect({}, (frame: any) => {
                console.log('WebSocket connection established:', frame);
            }, (error: any) => {
                console.error('WebSocket connection error:', error);
            });
        } catch (error) {
            console.error('WebSocket client creation error:', error);
        }
    }

    public send(data: string, documentId: string): void {
        const path = '/app/' +  documentId
        const jsonData = {
            content: data
        };
        if (this.connection && this.connection.connected) {
            this.connection.send(path, {}, JSON.stringify(jsonData));
        } else {
            console.error('WebSocket connection is not established or disconnected.');
        }
    }

    public listen(documentId: string): void {
        const path = '/topic/' +  documentId
        if (this.connection && this.connection.connected) {
            this.connection.subscribe(path, (data: any) => {
                //console.log(data.body);
                let body = JSON.parse(data.body)
                this.content = body.content;
            }, (error: any) => {
                console.error('WebSocket connection error:', error);
            })
        } else {
            console.error('WebSocket connection is not established.');
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
