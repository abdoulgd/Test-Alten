import { Router } from 'express';
import {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    removeProduct 
} from '../controllers/productController.js';

const router = Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

//shema swagger for product
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *            type: object
 *            required:
 *              - code
 *              - name
 *              - price
 *            properties:
 *             id:
 *              type: number
 *              description: The product id is generated automatically
 *             code:
 *              type: string
 *              description: The product code
 *             name:
 *              type: string
 *              description: The product name
 *             description:
 *              type: string
 *              description: The product description
 *             price:
 *              type: number
 *              description: The product price
 *             quantity:
 *              type: number
 *              description: The product quantity
 *             inventoryStatus:
 *              type: string
 *              description: The product inventory status
 *             category:
 *              type: string
 *              description: The product category
 *             image:
 *              type: string
 *              description: The product image
 *             rating:
 *              type: number
 *              description: The product rating
 * 
 */

// Route to recover all products
/**
 * @swagger
 * /products:
 *      get:
 *        summary: Lists all the products
 *        tags: [Products]
 *        description: The products list
 *        responses:
 *         200:
 *          description: The products list
 *          content:
 *           application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Product'
 *         404:
 *          description: products not found
 */
router.route('/products').get(async (req, res) => {
    const response = await getAllProducts();

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

// Route to retrieve a product by ID
/**
 * @swagger
 * /products/{id}:
 *      get:
 *        summary: Get a product by ID
 *        tags: [Products]
 *        description: Get a product by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The product ID
 *            schema:
 *              type: number
 *        responses:
 *         200:
 *          description: The product
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         404:
 *          description: product not found
 */
router.route('/products/:id').get(async (req, res) => {
    const response = await getProductById(req, res);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

// Route to add a new product
/**
 * @swagger
 * /products:
 *      post:
 *        summary: Add a new product
 *        tags: [Products]
 *        description: Add a new product
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        responses:
 *         201:
 *          description: Product was successfully added
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         400:
 *          description: product not added
 */
router.route('/products').post(async (req, res) => {
    const response = await addProduct(req, res);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(400).json(response);
    }
})

// Route to update a product by ID
/**
 * @swagger
 * /products/{id}:
 *      put:
 *        summary: Update a product by ID
 *        tags: [Products]
 *        description: Update a product by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The product ID
 *            schema:
 *              type: number
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        responses:
 *         200:
 *          description: Product was successfully updated
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         404:
 *          description: product not found
 */
router.route('/products/:id').put(async (req, res) => {
    const response = await updateProduct(req, res);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
})

// Route to delete a product by ID
/**
 * @swagger
 * /products/{id}:
 *      delete:
 *        summary: Delete a product by ID
 *        tags: [Products]
 *        description: Delete a product by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The product ID
 *            schema:
 *              type: number
 *        responses:
 *         200:
 *          description: Product was successfully deleted
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         404:
 *          description: product not found
 */
router.route('/products/:id').delete(async (req, res) => {
    const response = await removeProduct(req, res);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
})

export default router;