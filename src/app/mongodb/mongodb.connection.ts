// getting-started.js
import mongoose from 'mongoose';
import { config } from '../../config';


export async function bootstrap() {
    await mongoose.connect(config.mongodb_url!);
}
