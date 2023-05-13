import mongoose from 'mongoose';

export async function setupConnection() {
    try {
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;
        const mongourl = process.env.MONGO_URL;
        if (!username) throw new Error(`'username' not configured at .env!`);
        if (!password) throw new Error(`'password' not configured at .env!`);
        if (!mongourl) throw new Error(`'mongourl' not configured at .env!`);

        const uri = `mongodb+srv://${username}:${password}@${mongourl}`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(new Date(), 'Connected to mongo', '\n');
    } catch (e) {
        console.error(e);
    }
}
