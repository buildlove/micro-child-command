
let Promise = require('bluebird')
let fs = Promise.promisifyAll(require('fs-extra'))
let path = require('path')
let chalk = require('chalk')

/**
 * 异步读取文件内容
 * @param {string} filePath 文件路径
 */
function fsReadFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, fr) {
      if (err) {
        reject(err);
      }
      resolve(fr)
    })
  })
}

/**
 * 同步读取多个文件
 * @param {Array} filePaths 文件路径
 */
function fsReadFilesAsync(filePaths){
  let datas = []
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    let data = fs.readFileSync(filePath)
    datas.push(data.toString())
  }
  return datas
}
function fsReadFileAsync(filePath){
  return fsReadFilesAsync([filePath])[0]
}

/**
 * 异步读取多个文件
 * @param {Array<string>} filePaths 多个文件路径
 */
function fsReadFiles(filePaths){
  let pro = []
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    let f = path.resolve(__dirname, filePath)
    pro.push(fsReadFile(f))
  }
  return Promise.all(pro)
}

/**
 * 异步写入文件
 * @param {string} rootPath 目录
 * @param {stirng} filePath 文件名(默认所有资源都在data目录中)
 * @param {stirng} text 写入内容文本
 * @param {string} flag 写入方式 a为文本追加  w为文本覆盖
 */
function fsWriteFile(rootPath="./", filename, text, flag) {
  let flagStr = flag ? flag : 'a';
  let filePath = path.resolve(__dirname, rootPath, filename)
  return new Promise(function (resolve, reject) {
    fs.writeFile(filePath, text, { flag: flagStr }, function (err) {
      if (err) {
        reject(err);
      }
      resolve(true)
    })
  })
}

/**
 * 删除文件
 * @param {stirng} filePath 文件名(默认所有资源都在data目录中)
 */
function fsDeleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

/**
 * 删除文件夹下的所有文件以及当前文件夹
 * @param {*} path 
 */
function fsDelDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}

/**
 * 找到文件夹下的所有文件
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  let result=[];
  function finder(filePath) {
      let files=fs.readdirSync(filePath);
      files.forEach((val, index) => {
          let fPath=path.join(filePath,val);
          let stats=fs.statSync(fPath);
          if(stats.isDirectory()) finder(fPath);
          if(stats.isFile()) result.push(fPath);
      });

  }
  finder(startPath);
  return result;
}

/**
 * 字符串转二维数组
 */
function stringToArray2(str){
  let arr = str.split("\n")
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if(a){
      arr2.push(a.split(','))
    }
  }
  return arr2
}

function fsCopyAsync(tem, dest){
  fs.copyAsync(tem, dest, {clobber: true})
  .then(() => {
    console.log("创建子微应用成功")
  })
  .catch(err => console.log(chalk.red(`cd ${err}`)))
}

module.exports = {
  fsReadFileAsync,
  fsReadFilesAsync,
  fsReadFile,
  fsReadFiles,
  fsWriteFile,
  fsDeleteFile,
  findSync,
  stringToArray2,
  fsDelDir,
  fsCopyAsync
}