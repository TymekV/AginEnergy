import mongoose from 'mongoose';

const plugSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    label: String,
    setUp: {
        type: Date,
        default: () => Date.now(),
    },
});

export default mongoose.model('Plug', plugSchema);