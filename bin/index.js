#! /usr/bin/env node

let program = require('commander')
let package = require('../package.json');
let { fsCopyAsync } = require('./fileController')

program
.version(package.version)
.usage('react-spa-cli name')
.parse(process.argv)

// 命令行输入参数
let newPath = program.args[0];

// 拷贝到目标文件夹中
function generator(dest) {
  let tem = __dirname.replace('\/bin', '') + '\/templates';
  return fsCopyAsync(tem, dest)
}

generator(newPath);