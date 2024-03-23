# CHAT SERVER WITH MONGODB
Node.js & Express - base.
Socket.io - simple chat with client that automatically loads.
MongoDB connection - simple noSQL database.
Automatically runs html on start.
Sample for BTH - Blekinge Technical Institute.

## Requirements 
- Installed MongoDB in the environment, running. 
  Database: chatBTH, collection: crowd
- Node
- Install packages with npm install.

## Placement
Main logic    - app.js
              - routes/chatDb.js
MongoDB tests - src/
Html          - chatHistory.html
              - index.html

## Install & run with Node Package Manager:
Install
-- npm install 

Set the port in app.js. Deafult 3001. 
Start server:
-- node app.js
or
-- npm start

Loads html automatically via port. 
In the browser see: 
- /         : the chat
- /chat     : json output of chat history
- /chat/gui : html output of the chat history 

## Run & install with Node Package Manager:
Eslint:
-- npm run eslint

## Port
Default it runs on port 3001 (in local environment: http://localhost:3001). 
Update in app.js, bottom.

## Run & test MongoDB:
Default set up with a MongoDb (https://www.mongodb.com/)
  database : chatBTH
  collection: crowd (default)
Integrated in the app.js.

Default runs on port 27017 ( mongodb://localhost:27017/chat )

Test files:
Basic test setup or RESET (OBS!):
-- node src/server.js

Test server:
-- node src/server.js
& more test files in src 