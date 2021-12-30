const Product = require("../database/Models/productSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

/////////////admin controllers///////////////////////////////

//create product
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  let images = [];

    if (typeof req.body.images === "string") {

      //if only one image is sent then it will be in the form of a single string
      images.push(req.body.images);

    } else {
      //else if mulitple images are sent then it will be in the form of an array of strings
      images = req.body.images;
      //no need to push as we passed the whole array.We could also have used spread opr for copying this array
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "starmart_product_images",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    //before , req.body.images contained those images which we sent from frontend ,
    //now req.body.images will contain those images' urls & public_ids which we stored in cloudinary

    req.body.user = req.user.id; //req.user coming from isAuthenticatedUser middleware
    //saving user id to know who created the product

    const product = await Product.create(req.body);
    //to directly pass 'req.body' for creation of the product , we stored user id & images link in req.body before

    res.status(201).json({ success: true, product });
});

//get all products
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});

//update a product by id
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  var product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //cloudinary

  let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      //deleting images from cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      //uploading new images
      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "starmart_product_images",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
    }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ success: true, product });
});

//delete a product by id
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  var product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //deleting images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, msg: "product deleted successfully" });
});

//////////product controllers///////

//get all products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  //pagination
  const resultPerPage = 8;

  const productsCount = await Product.countDocuments();

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  //sort by price or ratings in increasing & decreasing
  const { sortPrice, sortRatings } = req.query;

  if (sortPrice === "incre" && sortRatings === "incre") {
    products = await apiFeature.query.clone().sort({ price: 1, ratings: 1 });
  } else if (sortPrice === "incre" && sortRatings === "decre") {
    products = await apiFeature.query.clone().sort({ price: 1, ratings: -1 });
  } else if (sortPrice === "decre" && sortRatings === "incre") {
    products = await apiFeature.query.clone().sort({ price: -1, ratings: 1 });
  } else if (sortPrice === "decre" && sortRatings === "decre") {
    products = await apiFeature.query.clone().sort({ price: -1, ratings: -1 });
  } else if (sortPrice === "incre" && sortRatings === "") {
    products = await apiFeature.query.clone().sort({ price: 1 });
  } else if (sortPrice === "decre" && sortRatings === "") {
    products = await apiFeature.query.clone().sort({ price: -1 });
  } else if (sortPrice === "" && sortRatings === "incre") {
    products = await apiFeature.query.clone().sort({ ratings: 1 });
  } else if (sortPrice === "" && sortRatings === "decre") {
    products = await apiFeature.query.clone().sort({ ratings: -1 });
  } else {
    products = await apiFeature.query.clone();
  }

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//get single product
exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {
  var product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({ succcess: true, product });
});

//////review controllers////////////

//create or update a review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    user_url : req.user.avatar.url,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (curr) => curr.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((curr) => {
      if (curr.user.toString() === req.user._id.toString())
        (curr.rating = rating), (curr.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((curr) => (avg = avg + curr.rating));
  product.ratings = avg / product.reviews.length;

  await product.save();

  res.status(200).json({ success: true });
});

//get all reviews of a product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
  
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

//delete review of a product
exports.deleteProductReview = asyncErrorHandler(async (req, res, next) => {
  
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.params.reviewId.toString()
  );

  let avg = 0;
  reviews.forEach((curr) => (avg = avg + curr.rating));

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.params.productId,
    { reviews, ratings, numOfReviews },
    { new: true }
  );

  res.status(200).json({ success: true });
});
