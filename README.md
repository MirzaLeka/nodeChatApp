## Chat 4pp

Chat 4pp is a Node.js chat application powered by Socket.io. It allows users to create their own chat rooms, join other rooms and enjoy private chat. Aside from texting, users can share their location and express themselves with emojis.

![](Resources/img/join.jpg)

------------------------
### Give it a try
Feel free to experience [app](https://chat4pp.herokuapp.com/) in first hand and send me your feedback!

------------------------

#### *Extra features*:
* Share your location via Javascript navigator
* Emojis

#### *Tech stack*:

App is built Javascript alone, with just a little snippet of Jquery code.
I used NodeJS on backend and webpack for module bundling on client side. You can see a full list of tehnologies below:

``` bash
# Frontend:
- HTML                  - CSS                  - Sass  
- Javascript           - EcmaScript6+          - Jquery
# Backend: 
- NodeJS               - ExpressJS             - Web Sockets
# Build tools:         
- Webpack 4    
# Unit testing:           
- Mocha                - Expect   
``` 
![](Resources/img/chat.jpg)

#### *Quick start*:

``` bash
# Install dependencies
npm i

# Run app
npm run build:dev # creates dist folder
npm start # starts the server on port 3000

# Close app
npm run clean # cleans dist folder

# Prerequisites: 
- NodeJS must be installed on your pc
```
