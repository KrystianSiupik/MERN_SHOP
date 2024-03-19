Follow these steps to launch project 
1.Enter frontend folder with visual studio code and run 'npm install' command that will install all dependencies
2.Enter server foler and run 'npm install'
3.Next in server folder change config.env depending on your MongoDB configuration for example:
 DATABASE=mongodb+srv://username:<password>@baza.cmrun82.mongodb.net/databaseName 
 USERNAME=yourUserName
 PASSWORD=yourUserNamePassword
4.use command nodemon .\Server.js and server will start
5.enter frontend folder and use 'npm start' command 