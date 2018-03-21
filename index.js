//-----------------------------------------------------------------------
// <copyright file = "index.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const botName = require('./auth.json').botName;

// create bot
const bot = require('./discord-client')();

// set bot name
bot.on('ready', () => {
    bot.user.setUsername(botName);
});

// log in
bot.login(require('./auth.json').discordToken);