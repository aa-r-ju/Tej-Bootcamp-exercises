```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note right of browser:  Input form data is  added first in the array and the dom is redrawn  and at the same time the input data is sent to server from browser without reloading the page preventing the default behavior of the form submission.
    activate server
 

```