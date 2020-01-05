const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const googleRoutes = require('./googleRoutes');

router.use('/api', apiRoutes);
router.use('/google', googleRoutes);
router.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

module.exports = router;
// Send every other request to the React app
// Define any API routes before this runs