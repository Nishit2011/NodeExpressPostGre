//pool instance will allow to connect node to db and run queries
const {Pool} = require('pg');
const {user,host,database,password,port} = require('../secrets/db_configuration.js')
const pool = new Pool(
    {user,host,database,password,port}
);


//node db command on terminal will run this index file

//export pool so that we can run our query from app.js
module.exports = pool;