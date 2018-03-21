//-----------------------------------------------------------------------
// <copyright file = "message-processor.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

// the Winston logger
const logger = require('./logger');

// message types enum
const MessageTypes = require('./message-types');

// look through the incoming message to see if it's something we need to respond to
const processDiscordMessage = (discordMessage) => {
    var messageType = MessageTypes.None;
    // only deal with the message if it's an object (with minimal object type validation)
    if (Object.prototype.toString.call(discordMessage) === '[object Object]' && discordMessage.content != undefined) {
        // we want to catch anything that might go wrong so the bot doesn't crash
        try {
            // extract the message's text
            var messageElements = discordMessage.content.toLowerCase().split(' ');
            // all our commands start with "bot"
            if (messageElements[0].startsWith('c!')) {
                switch (messageElements[0]) {
                    case 'c!help':
                        messageType = MessageTypes.Help;
                        break;
                    case 'c!ping':
                        messageType = MessageTypes.Ping;
                        break;
                    case 'c!hug':
                        messageType = MessageTypes.Hug;
                        break;
                    case 'c!kiss':
                        messageType = MessageTypes.Kiss;
                        break;
                    case 'c!slap':
                        messageType = MessageTypes.Slap;
                        break;
                    case 'c!poke':
                        messageType = MessageTypes.Poke;
                        break;
                    case 'c!anime':
                        messageType = MessageTypes.Anime;
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            // log all errors
            logger.log('error', `An error occurred in the message processor: ${error.message}`);
        }
    }

    return messageType;
}

module.exports = processDiscordMessage;
