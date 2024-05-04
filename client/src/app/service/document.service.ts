import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private baseUrl = 'http://localhost:8080/v1';

    constructor(private http: HttpClient) { }

    saveDocumentId(documentId: string): Observable<string> {
        const url = `${this.baseUrl}/${documentId}`;
        return this.http.post<string>(url, null);
    }

    getDocumentContent(documentId: string): Observable<any> {
        const url = `${this.baseUrl}/${documentId}`;
        return this.http.get<any>(url);
    }

    saveDocument(document: any): Observable<any> {
        const url = `${this.baseUrl}/save`;
        return this.http.post<any>(url, document);
    }
}