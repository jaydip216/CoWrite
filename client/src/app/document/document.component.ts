import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ActivatedRoute } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit{
  
  title = 'CoWord';
  editorContent : any;
  response : any;
  documentId: any;

  constructor(private websocketService: WebsocketService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('documentId');
  }

  onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.editorContent = event['editor']['root']['innerHTML'];
    this.websocketService.send(this.editorContent, this.documentId);
    this.response = this.websocketService.content ;
  }

  connect(){
    this.websocketService.listen(this.documentId);
  }

  onContentChanged(event: any) {
  }

}
