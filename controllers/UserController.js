const express = require('express')
const User = require('../models/User.models')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const { use } = require('../routes/UserRoutes')

const users = [
  {
    firstName: 'Denniss',
    lastName: 'Peters',
    email: 'munyao1@gmail.com',
    idno: '1222346',
    phoneNo: '94325423754'
  },
  {
    firstName: 'ALexander',
    lastName: 'Anelka',
    email: 'anold7@gmail.com',
    idno: '1222346',
    phoneNo: '94325423754'
  },
  {
    firstName: 'John',
    lastName: 'Brighton',
    email: 'munrtgetgr@gmail.com',
    idno: '1222346',
    phoneNo: '94325423754'
  }
]

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    if (!users) return res.status(200).json({ msg: 'Users not found' })

    return res.status(200).json({ users })
  } catch (error) {
    return res.status(200).json({ error: error.message })
  }
}

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'This user already already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json({ msg: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(404).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: '1h'
    })

    return res.status(200).json(token)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
