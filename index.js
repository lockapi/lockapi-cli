#!/usr/bin/env node

var program = require('commander');
var Client = require('node-rest-client').Client;

var client = new Client();


const LOCK_API_BASE_URL = process.env.LOCK_API_BASE_URL || "https://lockapi-dev.herokuapp.com";

// registering remote methods
client.registerMethod("checkLock", LOCK_API_BASE_URL + "/api/op/lock/check", "POST");

program
    .arguments('<lockId>, <token>')
    .version('0.0.1', '-v, --version')
    .action(function (lockId, token) {
        var args = {
            headers: { "Content-Type": "application/json" },
            data: {
                lockId: lockId,
                token: token
            }
        };
        client.methods.checkLock(args, function (data, response) {
            // parsed response body as js object
            console.log(data);
            if (data.locked || response.status != 200) {
                process.exit(1);
            } else {
                process.exit(0);
            }
        });;
    })
    .parse(process.argv);
