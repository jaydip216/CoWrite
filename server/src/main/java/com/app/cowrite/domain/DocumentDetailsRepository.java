package com.app.cowrite.domain;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentDetailsRepository extends MongoRepository<DocumentDetails, String>{

    public DocumentDetails findByDocumentId(String documentId);
    
}