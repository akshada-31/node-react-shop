const bcrypt=require('bcrypt')
const users = [
    {
        name:"Admin",
        email:"admin@mode.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin: true,
    },

    {
        name:"User",
        email:"user@node.com",
        password:bcrypt.hashSync("123456",10),
    },
]

module.exports=users;