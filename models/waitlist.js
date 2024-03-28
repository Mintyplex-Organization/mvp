// models/Waitlist.js
import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
},
    { timestamps: { createdAt: 'created_at'} }
);

const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema);

export default Waitlist;