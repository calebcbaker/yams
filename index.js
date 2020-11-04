const axios = require("axios")
const cheerio = require("cheerio");
const md5 = require('md5')
const Discord = require('discord.js');
const client = new Discord.Client();
var targetDiscordUser;
fs = require('fs');
// run the app once and replace this with the newly generated hash to check against
var cached_md5 = "50880106798f00dfa605ecc9f3d4fd7c";

client.once('ready', () => {
    console.log('Discord client ready');
    // start fetch'n
    fetchHTML("https://www.yamahamotorsports.com/motorcycle/inventory/results/76118/tenere-700/2021");
});

client.login('change this to your bots secret api key').then(() => {
    console.log('Discord login successful');
});

async function fetchHTML(url) {
    // que up some re-fetch'n
    setTimeout(() => {
        fetchHTML("https://www.yamahamotorsports.com/motorcycle/inventory/results/76118/tenere-700/2021")
    }, 300000) // 300000 == 5 min

    const { data } = await axios.get(url)
    const $ = cheerio.load(data);

    val = $('.inventoryResultsContainer').html()
    let new_md5 = md5(val);
    console.log(md5(val))
    options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'America/Chicago'
    };
    date = new Date();
    // post the date/time useful for monitoring the last time a fetch was done
    console.log(new Intl.DateTimeFormat('default', options).format(date));

    if (cached_md5 != new_md5) {
        // website changed, smash that discord!!
        SendMessage('ERMAGeRD NeR YAMAhERZ!!')
    }
    console.log(cached_md5 == new_md5);
}

function SendMessage(message) {
    // get my discord server by ID
    guild = client.guilds.cache.get('change this to your server id');
    guild.members.fetch().then((online) => {
        // get my discord username by id
        targetDiscordUser = client.users.cache.get('change this to your  discord user id')
        targetDiscordUser.send(message)
    })
}