import { Component } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoWord';
  editorContent : any;

  onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
    //console.log(event);
    this.editorContent = event['editor']['root']['innerHTML'];
  }

  onContentChanged(event: any) {
    //console.log(event);
  }

}
