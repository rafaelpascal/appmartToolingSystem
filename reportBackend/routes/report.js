const {Router}= require('express');
const usercontrol =require('../controllers/report')
const router = Router();
const {verifyToken, verifyTokenAdmin} = require("../middleware/verifyToken")


router.post('/postreview', verifyToken, usercontrol.review_post);
router.get('/getreviewall',verifyToken, usercontrol.review_getall);
router.get('/getreviewone/:id', verifyToken, usercontrol.review_getone);
router.patch('/remark/:id', usercontrol.remark);

module.exports = router;