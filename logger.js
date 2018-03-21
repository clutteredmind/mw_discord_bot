//-----------------------------------------------------------------------
// <copyright file = "logger.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');

// make sure the log directory exists and create it if it doesn't
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// set up Winston
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'log-file',
            filename: path.join(logDirectory, 'mw_discord_bot.log'),
            // limit log file size to 2MB
            maxsize: 2000000,
            // keep a maximum of 5 files
            maxFiles: 5,
            // "silly" catches all log message levels
            level: 'silly'
        })
    ]
});

module.exports = logger;