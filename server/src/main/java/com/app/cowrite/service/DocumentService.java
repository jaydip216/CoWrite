package com.app.cowrite.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.cowrite.data.Document;
import com.app.cowrite.data.DocumentIdentifier;
import com.app.cowrite.domain.DocumentDetails;
import com.app.cowrite.domain.DocumentDetailsRepository;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentDetailsRepository documentDetailsRepository;

    public DocumentIdentifier generateDocumentId(){
        final String uuId = UUID.randomUUID().toString();
        final DocumentDetails documentDetails = DocumentDetails.builder().documentId(uuId).build();
        this.documentDetailsRepository.save(documentDetails);
        return DocumentIdentifier.builder().documentId(uuId).build();
    }

    public Document getDocument(final String documentId){
        DocumentDetails documentDetails = this.documentDetailsRepository.findByDocumentId(documentId);
        final Document document = Document.builder().content(documentDetails.getContent()).build();
        return document;
    }

    public void save(final String documentId, final String content){
        DocumentDetails documentDetails = this.documentDetailsRepository.findByDocumentId(documentId);
        documentDetails.setContent(content);
        this.documentDetailsRepository.save(documentDetails);
    }
}
