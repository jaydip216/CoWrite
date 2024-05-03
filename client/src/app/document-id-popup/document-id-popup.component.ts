import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-document-id-popup',
  templateUrl: './document-id-popup.component.html',
  styleUrls: ['./document-id-popup.component.css']
})
export class DocumentIdPopupComponent {
  @Output() close = new EventEmitter<boolean>();

  @Input() documentId: any; 
  @Input() isNewDocument: boolean = true;

  submitDocumentId() {
    this.close.emit(true); // Close the popup
  }
}
