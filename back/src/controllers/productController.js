import Product from '../models/productModel.js';

// Get all products
export async function getAllProducts() {
    try {
        const products = await Product.find();

        if (!products) {
            return { success: false, error: "products not found" };
        }

        return { success: true, data: products, totalProducts: products.length };

    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get product by Id
export async function getProductById(req, res) {
    try {
        const product = await Product.findOne({ 'id': req.params.id });

        if (!product) {
            return {success: false, message: "product not found"};
        }

        return {success: true, data: product};

    } catch (err) {
        return {success: false, message: "product not found " + err};
    }
}

// Add a new product, returns the added product
export async function addProduct(req, res) {
    try {
        // if the product id exits
        const existingContact = await Product.findOne({ 'id': req.body.id });

        if (existingContact) {
            return {
                success: false,
                message: "Contact with the same ID already exists.",
            };
        }

        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        if (!savedProduct) {
            return {success: false, message: "product not added"};
        }

        return {success: true, data: savedProduct};

    } catch (err) {
        return {success: false, message: "product not added " + err};
    }
}

// Update an existing product by Id
export async function updateProduct(req, res) {
    try {
        const product = await Product.findOneAndUpdate({ 'id': req.params.id } , req.body , {new: true});

        if (!product) {
            return {success: false, message: "product not updated"};
        }

        return {success: true, data: product};

    } catch (err) {
        return {success: false, message: "product not updated " + err};
    }
}

// Remove an existing product by Id
export async function removeProduct(req, res) {
    try {
        const product = await Product.findOneAndDelete({ 'id': req.params.id });

        if (!product) {
            return {success: false, message: "product not removed"};
        }

        return {success: true, data: product};

    } catch (err) {
        return {success: false, message: "product not removed " + err};
    }
}
