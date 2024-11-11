import mongoose from 'mongoose';

const aginTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    nativeToken: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
        enum: ['android', 'ios'],
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default mongoose.model('AginToken', aginTokenSchema);