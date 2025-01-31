import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { EditorComponent } from './app/components/editor/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {}

const routes = [
  { path: '', component: HomeComponent },
  { path: 'editor/:id', component: EditorComponent },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});