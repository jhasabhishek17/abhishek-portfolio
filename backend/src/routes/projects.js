const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')

router.get('/devconnect/demo', projectsController.getDevConnectDemo)
router.post('/resume-screener/analyze', projectsController.analyzeResume)
router.get('/eduplatform/courses', projectsController.getEduPlatformCourses)

module.exports = router
