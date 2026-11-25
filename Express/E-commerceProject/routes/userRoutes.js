const express = require('express');
const router =express.Router();

router.get('/',(req,res)=>{
    res.send("Fetching all users");
});
router.post('/',(req,res)=>{
    res.send("Adding a user");
})
module.exports =router;