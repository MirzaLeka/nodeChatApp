### Chat 4pp

I love learning new technologies and for my latest project I choose to learn web sockets. As I was learning, I created this
simple chat app. **Chat 4pp** allows users to create their own rooms, join other rooms and enjoy private chat.
Users can also share their current location with other users with a help of Javascript navigator.

![](Resources/img/join.jpg)

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

Feel free to experience [app](https://chat4pp.herokuapp.com/) in first hand and send me your feedback!
