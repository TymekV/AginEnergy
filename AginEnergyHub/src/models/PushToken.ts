import mongoose from 'mongoose';

const pushTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
    },
    addedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default mongoose.model('PushToken', pushTokenSchema);