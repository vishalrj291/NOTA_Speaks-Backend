const router = require('express').Router()
const auth = require('../middleware/auth')
const JoinRequest = require('../models/JoinRequest')
const ContactMessage = require('../models/ContactMessage')

// GET join requests (with optional filters)
router.get('/join-requests', auth, async (req, res) => {
  try {
    const filter = {}

    if (req.query.profession)
      filter.profession = req.query.profession

    if (req.query.state)
      filter.state = req.query.state

    if (req.query.interest)
      filter.interests = req.query.interest

    const requests = await JoinRequest.find(filter)
      .sort({ createdAt: -1 })

    res.json(requests)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// UPDATE join request status
router.patch('/join-requests/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      })
    }

    const request = await JoinRequest.findById(req.params.id)

    if (!request) {
      return res.status(404).json({
        message: 'Request not found'
      })
    }

    // Prevent changing status once finalized
    if (request.status === 'approved' || request.status === 'rejected') {
      return res.status(400).json({
        message: `Request has already been ${request.status}`
      })
    }

    request.status = status
    await request.save()

    res.json(request)

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to update request status'
    })
  }
})

// GET contact messages
router.get('/contacts', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })

    res.json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router