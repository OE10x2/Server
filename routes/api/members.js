const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

//Get all members
router.get('/', (req, res) => res.json(members));

//Get specific member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id == req.params.id); //Boolean
    if (found){
        res.json(members.filter(member => member.id == req.params.id));
        //Alt: member.id === parseInt(req.params.id);
    }else{
        res.status(400).json({msg: `Member ${req.params.id} doesn\'t exist`});
    }
});

//Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active' //Just for now
    };
    if (!newMember.name || !newMember.email) return res.status(400).json({msg: 'Missing information'});
    members.push(newMember);
    res.redirect('/');
});

//Edit/update member
router.put('/:id', (req, res) => {
    let found = false;
    members.forEach(m => {
        if (m.id === parseInt(req.params.id)){
            found = true;
            if (req.body.name) m.name = req.body.name;
            if (req.body.email) m.email = req.body.email;
            res.json({msg: 'Member updated', m});
        }
    });
    if (!found) res.status(400).json({msg: `Member ${req.params.id} doesn\'t exist`});
});

//Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id == req.params.id); //Boolean
    if (found){
        const temp = members.filter(member => member.id !== parseInt(req.params.id));
        res.json({msg: 'Member deleted', member: temp});
    }else{
        res.status(400).json({msg: `Member ${req.params.id} doesn\'t exist`});
    }
});

module.exports = router;

console.log("UPDATE");