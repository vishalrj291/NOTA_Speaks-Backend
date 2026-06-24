require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Admin = require('./models/Admin')
const Campaign = require('./models/Campaign')
const FAQ = require('./models/FAQ')
const SocialLink = require('./models/SocialLink')

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  // ADMIN
  const email = process.env.ADMIN_EMAIL || 'admin@notaspeaks.org'
  const password = process.env.ADMIN_PASSWORD || 'NOTASpeaks@2025'

  const existing = await Admin.findOne({ email })

  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12)
    await Admin.create({ email, passwordHash })
    console.log('✅ Admin created')
  }

  // CAMPAIGNS
  if ((await Campaign.countDocuments()) === 0) {
    await Campaign.insertMany([
      {
        title: 'Know Your Rights',
        description: 'Legal awareness campaign',
        status: 'Completed'
      },
      {
        title: 'Digital Safety Week',
        description: 'Cyber safety awareness',
        status: 'Completed'
      }
    ])

    console.log('✅ Campaigns added')
  }

  // FAQS
  if ((await FAQ.countDocuments()) === 0) {
    await FAQ.insertMany([
      {
        question: 'Is NOTA Speaks political?',
        answer: 'No, it is completely non-partisan.'
      },
      {
        question: 'Who can join?',
        answer: 'Any citizen can join.'
      }
    ])

    console.log('✅ FAQs added')
  }

  // SOCIAL LINKS
  if ((await SocialLink.countDocuments()) === 0) {
    await SocialLink.insertMany([
     {
  platform: 'Instagram',
  url: 'https://instagram.com/notaspeaks',
  icon: 'instagram'
},
      {
  platform: 'YouTube',
  url: 'https://youtube.com',
  icon: 'youtube'
}
    ])

    console.log('✅ Social links added')
  }

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})