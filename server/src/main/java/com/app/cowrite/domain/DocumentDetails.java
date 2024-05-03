package com.app.cowrite.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;

import lombok.Builder;
import lombok.Data;

@Collation("document_details")
@Data
@Builder
public class DocumentDetails {

    @Id
    private String id;
    private String documentId;
    private String content;
    
}
