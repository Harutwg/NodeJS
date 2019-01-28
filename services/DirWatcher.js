import fs from 'fs';
import EventEmitter from './EventEmitter';

export default class DirWatcher {

    constructor() {
        this.files = [];
    }

    watch = (path, delay) => {
        setInterval(() => {
            this.readFilesRecursive(path);
        }, delay, true)
    };

    readFilesRecursive = (path) => {
        const readOptions = {
            withFileTypes: true
        };

        fs.readdir(path, readOptions, (err, files) => {
            if(err) {
                throw err;
            }
            files.forEach((file) => {

                const filePath = `${path}/${file.name}`;

                if(file.isDirectory()) {
                    this.readFilesRecursive(filePath);
                }
                else {
                    const fileStat = fs.statSync(filePath);
                    const foundFile = this.files.find((fileInfo => fileInfo.name === file.name));
                    if(!foundFile) {
                        this.files.push({
                            name: file.name,
                            mTime: fileStat.mtimeMs,
                        });
                        EventEmitter.emit('dirwatcher:changed', filePath);
                    } else if(foundFile.mTime < fileStat.mtimeMs){
                        foundFile.mTime = fileStat.mtimeMs;
                        EventEmitter.emit('dirwatcher:changed', filePath);
                    }
                }
            })
        });
    };
}