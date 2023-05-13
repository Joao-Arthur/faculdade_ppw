import mongoose, { Schema } from 'mongoose';

const Album = mongoose.model(
    'Album',
    new Schema(
        {
            title: String,
            band: String,
            trackList: [String],
            release: Date
        },
        { timestamps: true }
    )
);

export default Album;
