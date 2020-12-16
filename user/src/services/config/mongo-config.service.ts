import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://127.0.0.1:27017/ms'
    };
  }
}
