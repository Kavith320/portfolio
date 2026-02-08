import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    // We'll store the entire portfolio structure in a single document
    // This allows for maximum flexibility
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'content' // Store in a collection named 'content'
});

// Since we only want one "official" version of the portfolio, 
// we'll just keep updating the same document.
export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
