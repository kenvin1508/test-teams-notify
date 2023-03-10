const express = require('express');
const PORT = process.env.PORT || 3001;
const server = express();
const axios = require('axios');
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

var webhookUrl = "https://studentptithcmeduvn.webhook.office.com/webhookb2/c7197ed2-8a1f-4356-9597-b160382b75ea@ae2be1e4-132e-4e59-b21f-eb7e27b3b606/IncomingWebhook/d3ac33a6b3804f1d9c50ad5a12618529/d28a8af4-9749-4b3c-a687-c28287c900f2";

server.post('/api/Send', (req, res) => {
    webhookUrl = req.body.webhookUrl;
    var cardJson = JSON.parse(req.body.cardBody);

    axios.post(req.body.webhookUrl, cardJson)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
});

server.post('/api/save', (req, res) => {
    var response = JSON.stringify(req.body);
    var card = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Submitted response:"+ response
                        }
                    ]
                }
            }
        ]
    }

    axios.post(webhookUrl, card).then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});