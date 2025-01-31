import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  documentId: string = '';
  content: string = '';
  documentUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.documentId = this.documentService.generateDocumentId();
      } else {
        this.documentId = params['id'];
      }
      
      this.documentUrl = `${window.location.origin}/editor/${this.documentId}`;
      this.documentService.joinDocument(this.documentId);
      this.documentService.getContentStream().subscribe(content => {
        if (content !== this.content) {
          this.content = content;
        }
      });
    });
  }

  onContentChange(newContent: string) {
    this.documentService.updateDocument(this.documentId, newContent);
  }

  copyUrl() {
    navigator.clipboard.writeText(this.documentId).then(() => {
      console.log('URL copied to clipboard');
    });
  }
}