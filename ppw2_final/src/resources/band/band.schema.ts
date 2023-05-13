import mongoose, { Schema } from 'mongoose';

const Band = mongoose.model(
    'Band',
    new Schema(
        {
            name: String,
            members: [String],
            foundation: Number,
            dissolution: Number,
            albums: [String]
        },
        { timestamps: true }
    )
);

export default Band;
