
'use strict';

const fs = require('fs');

const uploadFolder = function (source, cb) {
  fs.readdir(source, function (err, files) {
    if (err) {
      cb('Error finding files: ' + err)
    } else {
      const fileQueue = [];

      files.forEach((filename, fileIndex) => {
        uploadFile(filename, fileIndex, source,fileQueue, cb, files);
      })
    }
  })
}

const uploadFile = function (filename, fileIndex,source, fileQueue, cb, files) {
  // let callBack = cb;
  // console.log(cb.pop());
  const filePath = source + '/' + filename
  // Uploading the file
   fileQueue.push(filePath)
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log('Error reading file: ' + err)
    } else {
      // Simulating file upload
      setTimeout(() =>{
        return uploadFileContents(filename, fileIndex, source, fileQueue, cb, files, filePath)
      }, 1000);
      // }, 1000)
    }
  })
}
                // () => {
                // fileQueue.splice(fileQueue.indexOf(filePath), 1);
                // if (fileQueue.length === 0) {
                //   cb(null, files.length)
                // }


const uploadFileContents = function (filename, fileIndex, source, fileQueue, cb, files, filePath) {
  fileQueue.splice(fileQueue.indexOf(filePath), 1);
  if (fileQueue.length === 0) {
    cb(null, files.length)
  }
}


exports.uploadFolder = uploadFolder;
exports.uploadFile = uploadFile;
exports.uploadFileContents = uploadFileContents;