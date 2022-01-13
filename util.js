const request = require('request')
const cheerio = require('cheerio')

function delay(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, delay)
    });

}

class Dollars {
    constructor() {
        this.dollar = {}
        this.fetch()
    }


    async updatePrice() {

        function doRequest(url) {
            return new Promise(function (resolve, reject) {
                request(url, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(body);
                    } else {
                        reject(error);
                    }
                });
            });
        }

        const data = await doRequest('https://www.tgju.org/profile/price_dollar_rl')
        const cheer = cheerio.load(data)
        const rawDollar = cheer('.price').html().replace(',', '')
        this.dollar.value = [rawDollar.slice(0, 2), ',', rawDollar.slice(3)].join('')
        let date = new Date()
        this.dollar.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        console.log('updated')
    }

//Updater
    async fetch() {
        while (1) {
            await delay(1000*60)
            await this.updatePrice()
        }
    };
}
module.exports = Dollars


