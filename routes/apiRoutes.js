const router = require('express').Router();
const Books = require('../models/books');

router.get("/books", (req, res) => {
    Books.find({})
        .then(function (data) {
            console.log(data)
            res.json(data)
        })
})

router.delete("/books/:id", (req, res) => {
    Books.findByIdAndDelete(req.params.id)
        .then(function (data) {
            console.log(data)
            res.json(data)
        })
})

router.post("/books", function (req, res) {
    Books.create(req.body).then(function (data) {
        res.json(data)
    })
})


module.exports = router;