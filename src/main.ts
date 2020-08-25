import * as fs from 'fs'
import * as path from 'path'
process.chdir(path.dirname(process.argv[1]))
if (!fs.existsSync('users')) {
    fs.mkdirSync('users')
}

import * as dotenv from 'dotenv'
dotenv.config()
import { Telegraf } from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'

const bot = new Telegraf(process.env.TOKEN)

import handleMessage from './handleMessage'
bot.on('message', async (ctx: TelegrafContext) => {
    console.log(ctx.message.text)
    if (ctx.message.chat.type == 'private') {
        await handleMessage(ctx)
    }
});

bot.launch()
