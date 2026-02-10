import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String, // 'page_view', 'session_heartbeat'
        required: true
    },
    path: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // milliseconds spent so far
        default: 0
    },
    userAgent: String,
    screenSize: String,
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
