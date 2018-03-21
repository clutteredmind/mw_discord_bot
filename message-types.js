//-----------------------------------------------------------------------
// <copyright file = "message-types.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request');
const authInfo = require('./auth.json');

const MessageTypes = {
    None: {},
    Help: {
        respond: (channel) => {
            let helpText = "All commands start with 'c!' then just add the thing you want to do from the list below.\n" +
                "'help' - The thing you just said. Tells you everything I can do.\n" +
                "'hug <user mention>' - Hugs someone.\n" +
                "'kiss <user mention>' - Kisses someone.\n" +
                "'slap <user mention>' - Slaps someone\n" +
                "'poke <user mention>' - Pokes someone.";
            channel.send(helpText);
        }
    },
    Ping: {
        respond: (channel) => {
            channel.send('pong');
        }
    },
    Hug: {
        respond: (channel, theHugger, theHugged) => {
            let hugFile = [];
            let hugFilePath = path.join(__dirname, 'images/hugs');
            let hugFiles = fs.readdirSync(hugFilePath);
            if (hugFiles != undefined && hugFiles.length > 0) {
                hugFile.push(path.join(hugFilePath, hugFiles[Math.floor(Math.random() * hugFiles.length)]));
            }

            channel.send(`${theHugged}, you received a hug from ${theHugger}!`, {
                files: hugFile
            });
        }
    },
    Kiss: {
        respond: (channel, theKisser, theKissed) => {
            let kissFile = [];
            let kissFilePath = path.join(__dirname, 'images/kisses');
            let kissFiles = fs.readdirSync(kissFilePath);
            if (kissFiles != undefined && kissFiles.length > 0) {
                kissFile.push(path.join(kissFilePath, kissFiles[Math.floor(Math.random() * kissFiles.length)]));
            }

            channel.send(`${theKissed}, you received a kiss from ${theKisser}!`, {
                files: kissFile
            });
        }
    },
    Slap: {
        respond: (channel, theSlapper, theSlapped) => {
            let slapFile = [];
            let slapFilePath = path.join(__dirname, 'images/slaps');
            let slapFiles = fs.readdirSync(slapFilePath);
            if (slapFiles != undefined && slapFiles.length > 0) {
                slapFile.push(path.join(slapFilePath, slapFiles[Math.floor(Math.random() * slapFiles.length)]));
            }

            channel.send(`${theSlapped}, you received a slap from ${theSlapper}!`, {
                files: slapFile
            });
        }
    },
    Poke: {
        respond: (channel, thePoker, thePoked) => {
            let pokeFile = [];
            let pokeFilePath = path.join(__dirname, 'images/pokes');
            let pokeFiles = fs.readdirSync(pokeFilePath);
            if (pokeFiles != undefined && pokeFiles.length > 0) {
                pokeFile.push(path.join(pokeFilePath, pokeFiles[Math.floor(Math.random() * pokeFiles.length)]));
            }

            channel.send(`${thePoked}, you received a poke from ${thePoker}!`, {
                files: pokeFile
            });
        }
    },
    Anime: {
        respond: (channel, messageContent) => {
            // split at the spaces, discard the first element (the bot command) and re-assemble with plus signs to get the query string
            let queryString = messageContent.split(' ').slice(1).join('+');
            if (queryString) {
                request({
                    method: 'GET',
                    uri: `https://myanimelist.net/api/anime/search.xml?q=${queryString}`,
                    headers: {
                        'Authorization': "Basic " + new Buffer(authInfo.myAnimeListUsername + ":" + authInfo.myAnimeListPassword).toString("base64")
                    }
                }, (error, response, body) => {
                    if (error) {
                        channel.send(`unable to find: ${queryString.replace(/\+/g, ' ')} :(`);
                    } else {
                        channel.send('found it!');
                    }
                });
            }
        }
    }
};

// freeze the MessageTypes object so that it cannot be changed
module.exports = Object.freeze(MessageTypes);