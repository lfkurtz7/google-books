const router = require('express').Router();
const axios = require('axios');

router.get("/:topic", (req, res) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.topic}&key=${process.env.GOOGLE_BOOKS_API}`
    axios.get(url)
        .then(data => {
            res.json(data.data.items)
        })
        .catch(err => res.send(err))
})

module.exports = router;