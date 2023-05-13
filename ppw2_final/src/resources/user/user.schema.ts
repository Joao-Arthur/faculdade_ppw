import mongoose, { Schema } from 'mongoose';

const User = mongoose.model(
    'User',
    new Schema(
        {
            name: String,
            username: String,
            password: String
        },
        { timestamps: true }
    )
);

export default User;
