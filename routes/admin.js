const express = require("express");
const router = express.Router();
const admincontroller = require('../controllers/admincontroller');
const tourcontroller = require('../controllers/tourcontroller');
const packageController = require('../controllers/packagecontroller');
const { upload } = require('../config/multer');
const verifyToken = require('../middleware/authmiddleware');

// -------------------- Auth Routes --------------------
router.get("/login", admincontroller.admingetlogin);
router.post("/login", admincontroller.adminlogin);
router.post('/logout', verifyToken, admincontroller.logout);

// -------------------- Admin Dashboard --------------------
router.get("/", verifyToken, admincontroller.adminhome);

// -------------------- Tour Routes --------------------
// Add new tour page
router.get("/addtour", verifyToken, admincontroller.addtour);

// Add a tour
router.post('/tours', verifyToken, upload.array('images', 5), tourcontroller.addTour);

// Shallow delete tour (use query parameter)
router.put('/tours/delete/:id', verifyToken, admincontroller.deleteTourById);

// Get tour by query id (if needed)
router.get('/tours', verifyToken, admincontroller.getTourById);

// Update tour
router.put('/tours/:id', verifyToken, upload.array('images', 5), tourcontroller.updateTour);

// Get all tours for admin listing
router.get("/alltour", verifyToken, admincontroller.alltours);

// -------------------- Category Routes --------------------
// Add category page (must be before /categories/:id)
router.get('/addcategory', verifyToken, admincontroller.addcategory);

// List all categories page (must be before /categories/:id)
router.get('/allcategory', verifyToken, admincontroller.allcategory);

// API: create category
router.post('/categories', verifyToken, admincontroller.postaddCategory);

// API: get edit category page (parameterized route - must be last)
router.get('/categories/:id', verifyToken, admincontroller.geteditCategory);

// API: update category
router.put('/categories/:id', verifyToken, admincontroller.editCategory);

// API: delete category
router.delete('/deletecategory/:id', verifyToken, admincontroller.deleteCategory);

// -------------------- Package (Subcategory) Routes --------------------
// List all packages page
router.get('/packages', verifyToken, packageController.getAllPackagesPage);

// Add package page
router.get('/packages/add', verifyToken, packageController.getAddPackagePage);

// API: create package (images only, videos are YouTube URLs)
router.post(
  '/packages',
  verifyToken,
  upload.array('images', 10),
  packageController.createPackage
);

// Edit package page
router.get('/packages/:id/edit', verifyToken, packageController.getEditPackagePage);

// API: delete a single image from a package (MUST be before /packages/:id routes)
router.delete(
  '/packages/:id/image',
  verifyToken,
  packageController.deletePackageImage
);

// API: update package (images only, videos are YouTube URLs)
router.put(
  '/packages/:id',
  verifyToken,
  upload.array('images', 10),
  packageController.updatePackage
);

// API: soft delete package
router.delete('/packages/:id', verifyToken, packageController.deletePackage);

module.exports = router;
