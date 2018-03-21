//-----------------------------------------------------------------------
// <copyright file = "discord-client.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const logger = require('./logger');
const Discord = require('discord.js');
const MessageTypes = require('./message-types');
const processDiscordMessage = require('./message-processor');

function makeBot() {
    // create the bot
    const bot = new Discord.Client({
        disabledEvents: ['TYPING_START']
    });

    // the bot is connected and ready to go
    bot.on('ready', () => {
        logger.log('debug', 'Bot connected');
    });

    // handle all incoming messages
    bot.on('message', (message) => {
        const messageType = processDiscordMessage(message);

        // we want to catch anything that might go wrong so the bot doesn't crash
        try {
            switch (messageType) {
                case MessageTypes.Help:
                case MessageTypes.Ping:
                    messageType.respond(message.channel);
                    break;
                case MessageTypes.Hug:
                case MessageTypes.Kiss:
                case MessageTypes.Slap:
                case MessageTypes.Poke:
                    messageType.respond(message.channel, message.author.username, message.mentions.users.first().toString());
                    break;
                case MessageTypes.Anime:
                    messageType.respond(message.channel, message.content);
                    break;
                case MessageTypes.None:
                default:
                    // do nothing by default or with the None type
                    break;
            }
        } catch (error) {
            // log all errors
            logger.log('error', `An error occurred in the bot's message handler: ${error.message}`);
        }
    });

    bot.on('error', (error) => {
        logger.log('error', `There was an error with the bot: ${error.message}`);
    });

    return bot;
}

module.exports = makeBot;