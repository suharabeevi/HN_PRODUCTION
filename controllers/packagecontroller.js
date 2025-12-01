const Package = require('../models/packagemodel');
const Category = require('../models/categorymodel');

// RENDER: Add package page
exports.getAddPackagePage = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('name');
    res.render('admin/addpackage', { categories });
  } catch (err) {
    console.error('getAddPackagePage error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// CREATE: Add new package
exports.createPackage = async (req, res) => {
  try {
    const { categoryId, name, description, price, currency, features } = req.body;

    if (!categoryId || !name || !price) {
      return res
        .status(400)
        .json({ success: false, message: 'Category, name and price are required' });
    }

    // Expecting features as JSON string or array
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid features JSON format' });
      }
    }

    const pkg = await Package.create({
      category: categoryId,
      name,
      description,
      price: Number(price),
      currency: currency || 'GBP',
      features: parsedFeatures,
    });

    res.status(201).json({ success: true, message: 'Package created successfully', package: pkg });
  } catch (err) {
    console.error('createPackage error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// RENDER: All packages list
exports.getAllPackagesPage = async (req, res) => {
  try {
    const packages = await Package.find({})
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .lean();

    res.render('admin/allpackages', { packages });
  } catch (err) {
    console.error('getAllPackagesPage error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// RENDER: Edit package page
exports.getEditPackagePage = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findById(id).populate('category').lean();
    if (!pkg) return res.status(404).send('Package not found');

    const categories = await Category.find({ isActive: true }).sort('name').lean();
    res.render('admin/editpackage', { pkg, categories });
  } catch (err) {
    console.error('getEditPackagePage error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// UPDATE: Package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, name, description, price, currency, features } = req.body;

    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid features JSON format' });
      }
    }

    const updated = await Package.findByIdAndUpdate(
      id,
      {
        category: categoryId,
        name,
        description,
        price: Number(price),
        currency: currency || 'GBP',
        features: parsedFeatures,
      },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: 'Package not found' });

    res.json({ success: true, message: 'Package updated successfully', package: updated });
  } catch (err) {
    console.error('updatePackage error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// DELETE: Soft delete
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Package.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: 'Package not found' });

    res.json({ success: true, message: 'Package deleted successfully', package: updated });
  } catch (err) {
    console.error('deletePackage error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

