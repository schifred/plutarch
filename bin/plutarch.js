#!/usr/bin/env node

'use strict';

// 命令行执行sudo npm link注册为命令
const Command = require('../lib/index');
const commander = new Command();
commander.start();
