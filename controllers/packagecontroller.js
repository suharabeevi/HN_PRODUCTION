const Package = require('../models/packagemodel');
const Category = require('../models/categorymodel');
const { uploadToCloudinary } = require('../config/multer');

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
    const { categoryId, name, description, price, currency, features, videos } = req.body;

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

    // Handle image uploads (optional)
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToCloudinary(file.path, 'image');
        imageUrls.push(url);
      }
    }

    // Handle videos as YouTube URLs (optional)
    let videoUrls = [];
    if (videos) {
      try {
        const parsed = typeof videos === 'string' ? JSON.parse(videos) : videos;
        if (Array.isArray(parsed)) {
          // basic trimming / filtering
          videoUrls = parsed.map(v => String(v).trim()).filter(Boolean);
        }
      } catch (e) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid videos format' });
      }
    }

    const pkg = await Package.create({
      category: categoryId,
      name,
      description,
      price: Number(price),
      currency: currency || 'GBP',
      features: parsedFeatures,
      images: imageUrls,
      videos: videoUrls,
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
    // Only show active packages (isActive: true or undefined/null for backward compatibility)
    const packages = await Package.find({ isActive: { $ne: false } })
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
    const { categoryId, name, description, price, currency, features, videos } = req.body;

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

    // Upload new images if provided (optional)
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToCloudinary(file.path, 'image');
        imageUrls.push(url);
      }
    }

    // Handle videos as YouTube URLs (optional)
    let videoUrls = null;
    if (videos !== undefined && videos !== null && videos !== '') {
      try {
        const parsed = typeof videos === 'string' ? JSON.parse(videos) : videos;
        if (Array.isArray(parsed)) {
          videoUrls = parsed.map(v => String(v).trim()).filter(Boolean);
        } else {
          videoUrls = [];
        }
      } catch (e) {
        console.error('Error parsing videos:', e);
        videoUrls = [];
      }
    }

    const updateData = {
      category: categoryId,
      name,
      description,
      price: Number(price),
      currency: currency || 'GBP',
      features: parsedFeatures,
    };

    // If new images uploaded, append them to existing images
    if (imageUrls.length > 0) {
      const existing = await Package.findById(id).select('images');
      const existingImages = existing && Array.isArray(existing.images) ? existing.images : [];
      updateData.images = [...existingImages, ...imageUrls];
    }

    // If videos provided (including empty array), update the list (YouTube URLs)
    if (videoUrls !== null) {
      updateData.videos = videoUrls;
    }

    const updated = await Package.findByIdAndUpdate(
      id,
      updateData,
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

// DELETE: single image from a package
exports.deletePackageImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.query; // send via query string to avoid body parsing issues

    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: 'imageUrl is required' });
    }

    const pkg = await Package.findById(id);
    if (!pkg) {
      return res
        .status(404)
        .json({ success: false, message: 'Package not found' });
    }

    const beforeCount = (pkg.images || []).length;
    pkg.images = (pkg.images || []).filter((img) => img !== imageUrl);
    const afterCount = pkg.images.length;

    if (beforeCount === afterCount) {
      // Image URL not found in package
      return res
        .status(404)
        .json({ success: false, message: 'Image not found in package' });
    }

    await pkg.save();

    res.json({ success: true, message: 'Image deleted successfully', package: pkg });
  } catch (err) {
    console.error('deletePackageImage error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

