package com.app.cowrite.data;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DocumentIdentifier {
    private String documentId;
}
