import { ProductModel, UserModel } from "./models";
import config  from './config/config.json';

console.log(config.name);

new ProductModel();
new UserModel();