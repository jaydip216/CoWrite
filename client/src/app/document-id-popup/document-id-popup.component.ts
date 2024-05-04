import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-id-popup',
  templateUrl: './document-id-popup.component.html',
  styleUrls: ['./document-id-popup.component.css']
})
export class DocumentIdPopupComponent {
  @Output() close = new EventEmitter<boolean>();

  @Input() documentId: any; 
  @Input() isNewDocument: boolean = true;

  constructor(private router:Router) { }
  

  submitDocumentId() {
    this.close.emit(true); // Close the popup
  }

  openDocument(formValue: any) {
    console.log(formValue.documentId);
    this.router.navigate(['/document'], { queryParams: { documentId: formValue.documentId } });
  }
}
