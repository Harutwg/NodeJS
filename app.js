//import { ProductModel, UserModel } from "./models";
import DirWatcher from './services/DirWatcher';
import Importer from './services/Importer';

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch(`${__dirname}/data`, 5000);
importer.listen();