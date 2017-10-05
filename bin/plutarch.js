#!/usr/bin/env node

'use strict';

// sudo npm link注册为命令
const Command = require('../lib/index');
const commander = new Command();
commander.start();
