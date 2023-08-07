const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/user')
const authenticationMiddleware = require('../middleware/authenticateJWT')

router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.login);
router.get('/courses',authenticationMiddleware,usercontroller.showCourses);
router.post('/courses/:courseId',authenticationMiddleware,usercontroller.purchaseCourse);
router.get('/purchasedCourses',authenticationMiddleware,usercontroller.showPurchasedCourse);

module.exports = router;