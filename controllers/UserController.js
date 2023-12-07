const User = require('../models/User')

const { getPostData } = require('../utils')

// GET all user
// Route : GET /api/users

async function getUsers(req, res){
    try {
        const users = await User.findAll()
        
        res.writeHead(200,{'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    }catch(error){
        console.log(error)
    }
}

// GET single user
// Route : /api/users/:id

async function getUser(req, res, id){
    try {
        const user = await User.findById(id)

        if (!user){
        res.writeHead(404,{'Content-Type': 'application/json' })
        res.end(JSON.stringify({message : 'user introuvable'}))
        }else {
        res.writeHead(400,{'Content-Type': 'application/json' })
        res.end(JSON.stringify(user))
        }
        
        
    }catch(error){
        console.log(error)
    }
}

// Create User
// Route :  Post /api/users

async function createUser(req, res){
    try {
        const body = await getPostData(req)

        const {name, email, password} = JSON.parse(body)

        const user = {
            name,
            email,
            password
        }
        const newUser = await User.create(user)
    
    res.writeHead(201, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(newUser))

        
    }catch(error){
        console.log(error)
    }
}

// Update User
// Route :  PUT /api/users/:id

async function updateUser(req, res, id){
    try {

        const user = await User.findById(id)
        
        if (!user) {
            res.writeHead(404,{'Content-Type': 'application/json' })
            res.end(JSON.stringify({message : 'user introuvable'}))
        }else {
            const body = await getPostData(req)

            const {name, email, password} = JSON.parse(body)
    
            const userData = {
                name: name || user.name,
                email: email || user.email,
                password: password || user.password
            }
            const updUser = await User.update(id, userData)
        
        res.writeHead(200, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(updUser))   
               }        
    }catch(error){
        console.log(error)
    }
}

// DELETE single user
// Route : DELETE /api/users/:id

async function deleteUser(req, res, id){
    try {
        const user = await User.findById(id)

        if (!user){
        res.writeHead(404,{'Content-Type': 'application/json' })
        res.end(JSON.stringify({message : 'user introuvable'}))
        }else {
        await User.remove(id)
        res.writeHead(400,{'Content-Type': 'application/json' })
        res.end(JSON.stringify({message : `User ${id} Supprimé`}))
        }
        
        
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}