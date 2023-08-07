const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/admin')
const authenticationMiddleware = require('../middleware/authenticateJWT')

router.post('/signup',admincontroller.signup);
router.post('/login',admincontroller.login);
router.get('/log',authenticationMiddleware,admincontroller.log)
router.post('/courses',authenticationMiddleware,admincontroller.createCourse);
router.put('/course/:courseId',authenticationMiddleware,admincontroller.updateCourse);
router.get('/course/:courseId',authenticationMiddleware,admincontroller.getCourse);
router.delete('/course/:courseId',authenticationMiddleware,admincontroller.deleteCourse);
router.get('/courses',authenticationMiddleware,admincontroller.showCourse);

module.exports = router;