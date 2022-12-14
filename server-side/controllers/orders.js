const Order = require('../models/order');
const tryCatch = require('./utils/tryCatch');
const moment = require('moment');

const getAllOrders = tryCatch(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
});

const getOrderById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json(order);
});

const getOrderByName = tryCatch(async (req, res) => {
    const { name } = req.params;
    const order = await Order.find().byFirstName(name);
    res.status(200).json(order);
});

const createOrder = tryCatch(async (req, res) => {
    const data = req.body;
    const order = new Order(data);
    await order.save();
    res.status(200).json(order);
});

const updateOrder = tryCatch(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await Order.findByIdAndUpdate(id, data);
    res.status(200).json({ ok: true });
});

const deleteOrder = tryCatch(async (req, res) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ ok: true });
});

//Hiển thị tất cả các mặt hàng được bán trong hôm nay
const getSoldOrderByDay = tryCatch(async (req, res) => {
    const eqDay = {
        $eq: [{ $dayOfMonth: '$createdAt' }, { $dayOfMonth: new Date() }],
    };
    const eqMonth = { $eq: [{ $month: '$createdAt' }, { $month: new Date() }] };
    const aggregate = [
        {
            $match: {
                $expr: {
                    $and: [eqDay, eqMonth],
                },
            },
        },
        {
            $project: {
                _id: 0,
                orderDetails: 1,
                createdAt: 1,
            },
        },
    ];
    const result = await Order.aggregate(aggregate);
    res.status(200).json(result);
});

//Hiển thị tất cả các mặt hàng được bán trong tuần nay
const getSoldOrderByWeek = tryCatch(async (req, res) => {
    let lastWeekend = moment().startOf('week').toDate();
    let today = moment().toDate();
    console.log('lastweek', lastWeekend);
    console.log('today', today);
    const aggregate = [
        {
            $match: {
                createdAt: {
                    $gt: lastWeekend,
                    $lt: today,
                },
            },
        },
        {
            $project: {
                _id: 0,
                orderDetails: 1,
                createdAt: 1,
            },
        },
    ];
    const orders = await Order.aggregate(aggregate);
    res.status(200).json(orders);
});

//Hiển thị tất cả các mặt hàng được bán trong tháng nay
const getSoldOrderByMonth = tryCatch(async (req, res) => {
    let BeginOfMonth = moment().startOf('month').toDate();
    let today = moment().toDate();
    const aggregate = [
        {
            $match: {
                createdAt: {
                    $gt: BeginOfMonth,
                    $lt: today,
                },
            },
        },
        {
            $project: {
                _id: 0,
                orderDetails: 1,
                createdAt: 1,
            },
        },
    ];
    const orders = await Order.aggregate(aggregate);
    res.status(200).json(orders);
});

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByName,
    createOrder,
    updateOrder,
    deleteOrder,
    getSoldOrderByDay,
    getSoldOrderByWeek,
    getSoldOrderByMonth,
};
