import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showDocumentIdPopup: boolean = false;
  documentId: string = '';
  isNewDocument: boolean = true;

  openDocumentIdPopup() {
    this.showDocumentIdPopup = true;
  }

  openExistingDocument(){
    this.isNewDocument = false;
    this.openDocumentIdPopup();
  }

  generateNewDocumentId() {
    this.documentId = uuidv4(); 
    this.isNewDocument = true;
    this.openDocumentIdPopup(); 
  }

  closeDocumentIdPopup(close: boolean) {
    this.showDocumentIdPopup = false;
  }

}
