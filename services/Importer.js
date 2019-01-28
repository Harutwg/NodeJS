import EventEmitter from './EventEmitter';
import csv from 'csvtojson';

export default class  Importer {
    listen = () => {
        EventEmitter.on('dirwatcher:changed', (path) => {this.import(path);})
    };

    import = (path) => {
        const promiseObj = csv()
            .fromFile(path);
        promiseObj.then((json) => {
            console.log(json);
        });
        return promiseObj;
    };
}