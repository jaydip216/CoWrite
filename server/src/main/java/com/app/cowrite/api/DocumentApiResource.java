package com.app.cowrite.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.cowrite.data.Document;
import com.app.cowrite.data.DocumentIdentifier;
import com.app.cowrite.service.DocumentService;

@RestController
@RequestMapping(path = "/documents")
public class DocumentApiResource {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/generateId")
    public DocumentIdentifier generateDocumentId(){
        return documentService.generateDocumentId();
    }

    @PostMapping("/{documentId}")
    public void saveDocument(@PathVariable("documentId") String documentId,@RequestBody Document document){
        this.documentService.save(documentId, document.getContent());
    }

    @GetMapping("/{documentId}")
    public Document getDocument(@PathVariable("documentId") String documentId){
        return this.documentService.getDocument(documentId);
    }
    
}
