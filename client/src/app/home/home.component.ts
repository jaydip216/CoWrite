import { Component } from '@angular/core';

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

  openDocumentPopUp(){
    this.isNewDocument = false;
    this.openDocumentIdPopup();
  }

  generateDocumentKey() {
    this.documentId = 'jhadgfkjhdabvfkbdakfb'; 
    this.isNewDocument = true;
    this.openDocumentIdPopup(); 
  }

  closeDocumentIdPopup(close: boolean) {
    this.showDocumentIdPopup = false;
  }

}
