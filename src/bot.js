require('dotenv').config()

// console.log(process.env.DISCORDJS_BOT_TOKEN)

const { Client } = require('discord.js')
const search = require('./search')
const client = new Client()
const PREFIX = "."

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
})

// Message Events
client.on('message', (message) => {
    if (message.author.bot) {
        return
    }
    if (message.content.startsWith(PREFIX))
    {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/)
        // console.log(CMD_NAME)
        // console.log(args)

        if (CMD_NAME === 'find')
        {
            if (args.length === 0)
                return message.channel.send("Please provide the Course ID\nPlease type \".help\" for futher instructions")
            else
                return message.channel.send(search.findClass(args))
        } 
        if (CMD_NAME === 'help')
        {
            return message.channel.send("Hi there, I'm the Course Navigator!!!\nI'll help you find the information that you need for any course at SFU\n\nYou can search up any courses here by typing the following command\n```.find cmpt 165```")
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)
// client.login(process.env.DISCORDJS_BOT_TOKEN_TEST)