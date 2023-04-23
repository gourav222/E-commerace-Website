const Order = require("../models/orderSchema");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFuctions = require("../middleware/catchAsyncFunction");
const products = require("../models/productSchmea");

exports.newOrder = catchAsyncFuctions(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncFuctions(async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order)
        return next(new ErrorHandler("Order not found with the Id",404));

    res.status(201).json({
        success:true,
        order
    })    
})

exports.getUserOrders = catchAsyncFuctions(async (req,res,next) => {
    const orders = await Order.find({user : req.user.id});

    res.status(201).json({
        success:true,
        orders
    })
})

exports.getAllOrdersAmount = catchAsyncFuctions(async (req,res,next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  })

  res.status(201).json({
    success:true,
    totalAmount,
    orders
  })
})

exports.updateOrder = catchAsyncFuctions(async(req,res,next) => {
  const order = await Order.findById(req.params.id);

  if(order.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already delivered this order",400));

  order.orderItems.forEach(async (order) => {
    await updateStocks(order.product,order.quantity);
  })  

  order.orderStatus = req.body.status;

  if(req.body.status === "Delivered"){
    orders.deliveredAt = Date.now();
  }  

  await order.save({validateBeforeSave:false});

  res.status(201).json({
    success:true
  })
})

async function updateStocks(id, quantity){
  const product = await products.findById(id);

  product.stock -= quantity;
  await product.save({validateBeforeSave:false})
}

exports.deleteOrder = catchAsyncFuctions(async (req,res,next) => {
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler('Product not found',401))
  }

  await order.remove();

  res.status(201).json({
    success:true
  })
})