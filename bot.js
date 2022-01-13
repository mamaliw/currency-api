require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const Dollars = require('./util')
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
const channelId = '@dollarKalaghi'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const dollar = new Dollars()

// Listen for any kind of message. There are different kinds of
// messages.
function delay(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, delay)
    });

}

async function run() {
    let msg
    let oldValue = 0
    while (1) {
        if (dollar.dollar.value && dollar.dollar.value !== oldValue) {
            msg = 'دلار کلاغی 🦅\n'
            msg += `---${dollar.dollar.value}---\n`
            msg += `\n————————————————————`
            msg += `\nTime: ${dollar.dollar.time}`
            msg += `\n————————————————————`
            msg += `\nمرجع قیمت لحظه ای دلار کلاغ ها`
            msg += `\n${channelId}`
            const options = {
                entities: JSON.stringify([
                    {
                        offset: msg.indexOf('دلار کلاغی 🦅'),
                        length: 'دلار کلاغی 🦅'.length,
                        type: "bold"
                    }
                ])
            }
            const chnlMsg = await bot.sendMessage(channelId, msg, options);
            oldValue = dollar.dollar.value
            // bot.deleteMessage(channelId,chnlMsg.message_id-1)
            console.log('sent to channel ',channelId,', msgId: ',chnlMsg.message_id)
        }

        await delay(1000)
    }
}

run()
