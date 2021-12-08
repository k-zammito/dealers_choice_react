const router = require('express').Router();
const { models: { Character } } = require('../db/index');

router.get('/characters', async(req, res, next) => {
    try {
        res.send(await Character.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

router.get('/characters/:id', async(req, res, next) => { 
    try {
        res.send(await Character.findOne({
            where: {
                id: req.params.id
            }
        }))
    }
    catch(ex) {
        next(ex);
    }
});

module.exports = router;