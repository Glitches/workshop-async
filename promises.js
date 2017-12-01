'use strict';

const fs = require('fs');

exports.uploadFolder = (source, cb) => {
    fs.readdir(source, function (err, files) {
        if (err) {
            cb('Error finding files: ' + err)
        } else {
            const fileQueue = [];

            files.forEach((filename, fileIndex) => {
                uploadFile(filename, fileIndex, source, fileQueue, cb, files);
            })
        }
    })
}

const uploadFile = (filename, fileIndex, source, fileQueue, cb, files) => {
    const ourPromise = new Promise (res, rej)
    const filePath = source + '/' + filename
    // Uploading the file
    fileQueue.push(filePath)
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.log('Error reading file: ' + err)
        } else {
            // Simulating file upload
            setTimeout(() => {
                fileQueue.splice(fileQueue.indexOf(filePath), 1);
                if (fileQueue.length === 0) {
                    cb(null, files.length)
                }
            }, 1000)
        }
    })
}