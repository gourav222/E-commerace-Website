const products = require("../models/productSchmea");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFuctions = require("../middleware/catchAsyncFunction");
const ApiFeatures = require("../utils/apiFeatures");

//Admin routes

//get products
exports.getAllProducts = catchAsyncFuctions(async (req, res, next) => {
// return next(new ErrorHandler("This is my temp error",500));
  const apiFeatures = new ApiFeatures(products.find(), req.query)
    .search()
    .filter()
    .pagination(8);
  const product = await apiFeatures.query;
  const productCount = await products.countDocuments();
  res.status(200).json({
    success: true,
    product,
    productCount
  });
});

//create products
exports.createProducts = catchAsyncFuctions(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await products.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//update products
exports.updateProducts = catchAsyncFuctions(async (req, res, next) => {
  let product = await products.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  product = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
//delete products
exports.deleteProducts = catchAsyncFuctions(async (req, res, next) => {
  let product = await products.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//getProductById
exports.getProdcutById = catchAsyncFuctions(async (req, res, next) => {
  let product = await products.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

exports.createProductReviews = catchAsyncFuctions(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const reviews = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await products.findById(productId);

  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(reviews);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = catchAsyncFuctions(async (req, res, next) => {
  const product = await products.findById(req.query.id);

  if (!product) return next(new ErrorHandler("Product does not exists", 401));

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncFuctions(async (req, res, next) => {
  const product = await products.findById(req.query.productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  const reviews = [];
  // product.reviews.filter((rev) => {
  //   rev.id.toString() !== req.query.id.toString();
  //   console.log(rev.id);
  // });

  product.reviews.forEach((rev) => {
    if (rev.id.toString() !== req.query.id.toString()) reviews.push(rev);
  });

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  // console.log(avg/reviews.length);
  const ratings = avg / reviews.length;
  const numberOfReviews = reviews.length;

  await products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
