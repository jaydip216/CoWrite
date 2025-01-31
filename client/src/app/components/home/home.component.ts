import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  showJoinForm = false;
  documentId = '';

  constructor(private router: Router) {}

  createNewDocument() {
    this.router.navigate(['/editor', 'new']);
  }

  joinDocument() {
    if (this.documentId) {
      this.router.navigate(['/editor', this.documentId]);
    }
  }
}