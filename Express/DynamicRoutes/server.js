const express = require('express');
const app = express();
app.get ('/welcome/:username',(req,res)=>{
    const username =req.params.username;
    const role = req.query.role;
    const message = `Welcome ${username}! Your role is ${role}.`;
    res.send(message);

});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})