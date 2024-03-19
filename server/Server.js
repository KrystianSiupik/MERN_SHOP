
const mongoose = require('mongoose');
const app = require('./app')

require('dotenv').config({path: './config.env'});

const db = process.env.DATABASE.replace("<password>",process.env.PASSWORD);

mongoose.connect(db).then((con)=>{
    console.log(con.connections);
})

const port = process.env.PORT || 5001;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});

