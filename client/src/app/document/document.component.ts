import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subscription } from 'rxjs';
import { DocumentService } from '../service/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  editorContent: any;
  response: any;
  documentId: any;
  private contentSubscription: Subscription | undefined;

  constructor(private websocketService: WebsocketService,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.documentId = params['documentId'];
      if (!this.documentId) {
        this.router.navigate(['/']);
      }
      this.documentService.saveDocumentId(this.documentId).subscribe();
      this.documentService.getDocumentContent(this.documentId).subscribe(content => { 
        this.response = content; 
      });
      this.connect();
      this.contentSubscription = this.websocketService.content$.subscribe(content => {
        this.response = content;
      });
    });
  }

  onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.editorContent = event['editor']['root']['innerHTML'];
    this.websocketService.send(this.editorContent, this.documentId);
  }

  connect() {
    this.websocketService.listen(this.documentId);
  }

  saveDocument() {
    this.documentService.saveDocument(this.response).subscribe();
  }

  ngOnDestroy(): void {
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
  }

}
