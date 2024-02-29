import mongoose from "mongoose";

// Setup schema
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    inventoryStatus: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
});

// Pre-save hook to auto-increment the id, starting from 1000 if no products exist
productSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastProduct = await this.constructor.findOne().sort({ id: -1 });
        this.id = lastProduct ? lastProduct.id + 1 : 1000; // Start from 1000 if no products exist
    }
    next();
});


export default mongoose.model('Product', productSchema);
