import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentComponent } from './document/document.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentIdPopupComponent } from './document-id-popup/document-id-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentComponent,
    DocumentIdPopupComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
