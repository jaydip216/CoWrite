package com.app.cowrite.api;

import com.app.cowrite.data.Document;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ConnectionApiResource {

    @MessageMapping("/{docId}")
    @SendTo("/topic/{docId}") 
    public Document getReply(@RequestBody Document data) throws InterruptedException {
        return data;
    }
}
