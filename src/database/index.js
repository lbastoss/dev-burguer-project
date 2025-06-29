import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import User from '../app/models/User';
import configDatabase from '../config/database';
import Product from '../app/models/Product';
import Category from '../app/models/Category';
import mongoose from 'mongoose';

const models = [User, Product, Category];
class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(configDatabase);
		models
			.map((model) => model.init(this.connection))
			// biome-ignore lint/complexity/useOptionalChain: <explanation>
			.map((model) => model.associate && model.associate(this.connection.models));
	}

	mongo() {
		this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {});
	}
}

export default new Database();
