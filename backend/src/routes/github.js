const express = require('express')
const router = express.Router()
const githubController = require('../controllers/githubController')

router.get('/profile', githubController.getProfile)
router.get('/repos', githubController.getRepos)
router.get('/stats', githubController.getStats)

module.exports = router
