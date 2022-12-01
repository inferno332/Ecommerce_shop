const Product = require('../models/product');
const tryCatch = require('./utils/tryCatch');

const getAllProducts = tryCatch(async (req, res) => {
    const page = req.query.page;
    const productsPerPage = 12;

    if (page) {
        const products = await Product.find()
            .skip(page * productsPerPage)
            .limit(productsPerPage)
            .populate('categoryId')
            .populate('supplierId');
        res.status(200).json(products);
    } else {
        const products = await Product.find().populate('categoryId').populate('supplierId');
        res.status(200).json(products);
    }
});

const getProductById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
});

const getProductByName = tryCatch(async (req, res) => {
    const { name } = req.params;
    const product = await Product.find().byName(name);
    res.status(200).json(product);
});

const createProduct = tryCatch(async (req, res) => {
    const data = req.body;
    const product = new Product(data);
    await product.save();
    res.status(200).json(product);
});

const updateProduct = tryCatch(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(product);
});

const deleteProduct = tryCatch(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ ok: true });
});

//Hiển thị tất cả mặt hàng có tồn kho dưới 50
const stockProduct = tryCatch(async (req, res) => {
    const result = await Product.find({ stock: { $lte: 50 } });
    res.status(200).json(result);
});

const searchProductByCategory = tryCatch(async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.query;
    const result = await Product.find({
        $and: [{ categoryId: categoryId }, { name: new RegExp(name, 'i') }],
    });
    res.status(200).json(result);
});

const filterProduct = tryCatch(async (req, res) => {
    const { category, supplier, option } = req.query;
    let categoryArray = category?.split('-') || [];
    let supplierArray = supplier?.split('-') || [];
    console.log(categoryArray, supplierArray);
    console.log(req.query);
    const aggegrate = [
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'suppliers',
                localField: 'supplierId',
                foreignField: '_id',
                as: 'supplier',
            },
        },
        {
            $unwind: {
                path: '$supplier',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                name: 1,
                price: 1,
                stock: 1,
                discount: 1,
                imageURL: 1,
                categoryName: '$category.name',
                supplierName: '$supplier.name',
            },
        },
    ];
    if (option === 'option1' && categoryArray.length > 0 && supplierArray.length > 0) {
        const result = await Product.aggregate(aggegrate).append({
            $match: {
                $and: [{ categoryName: { $in: categoryArray } }, { supplierName: { $in: supplierArray } }],
            },
        });
        res.status(200).json(result);
    } else if (option === 'option2' && categoryArray.length > 0 && supplierArray.includes('undefined')) {
        const result = await Product.aggregate(aggegrate).append({
            $match: { categoryName: { $in: categoryArray } },
        });
        res.status(200).json(result);
    } else if (option === 'option2' && categoryArray.includes('undefined') && supplierArray.length > 0) {
        const result = await Product.aggregate(aggegrate).append({
            $match: { supplierName: { $in: supplierArray } },
        });
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: 'Bad request' });
    }
});

module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
    stockProduct,
    searchProductByCategory,
    filterProduct,
};
