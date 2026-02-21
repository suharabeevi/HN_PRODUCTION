const Service = require('../models/servicemodel');
const { uploadToCloudinary } = require('../config/multer');

// RENDER: Add service page
exports.getAddServicePage = async (req, res) => {
  try {
    res.render('admin/addservice');
  } catch (err) {
    console.error('getAddServicePage error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// CREATE: Add new service
exports.createService = async (req, res) => {
  try {
    const { title, description, icon, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    let imageSmall = '';
    let imageMedium = '';

    // Handle image uploads
    if (req.files) {
      const smallFile = req.files.find(f => f.fieldname === 'imageSmall');
      const mediumFile = req.files.find(f => f.fieldname === 'imageMedium');

      if (smallFile) {
        imageSmall = await uploadToCloudinary(smallFile.path, 'image');
      }
      if (mediumFile) {
        imageMedium = await uploadToCloudinary(mediumFile.path, 'image');
      }
    }

    const service = await Service.create({
      title,
      description,
      icon,
      priority: Number(priority) || 0,
      imageSmall,
      imageMedium,
    });

    res.status(201).json({ success: true, message: 'Service created successfully', service });
  } catch (err) {
    console.error('createService error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// RENDER: All services list
exports.getAllServicesPage = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ priority: 1, createdAt: -1 }).lean();
    res.render('admin/allservices', { services });
  } catch (err) {
    console.error('getAllServicesPage error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// RENDER: Edit service page
exports.getEditServicePage = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).lean();
    if (!service) return res.status(404).send('Service not found');

    res.render('admin/editservice', { service });
  } catch (err) {
    console.error('getEditServicePage error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// UPDATE: Service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, priority } = req.body;

    const updateData = {
      title,
      description,
      icon,
      priority: Number(priority) || 0,
    };

    // Handle image uploads
    if (req.files) {
      const smallFile = req.files.find(f => f.fieldname === 'imageSmall');
      const mediumFile = req.files.find(f => f.fieldname === 'imageMedium');

      if (smallFile) {
        updateData.imageSmall = await uploadToCloudinary(smallFile.path, 'image');
      }
      if (mediumFile) {
        updateData.imageMedium = await uploadToCloudinary(mediumFile.path, 'image');
      }
    }

    const updated = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updated) return res.status(404).json({ success: false, message: 'Service not found' });

    res.json({ success: true, message: 'Service updated successfully', service: updated });
  } catch (err) {
    console.error('updateService error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// DELETE: Soft delete
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: 'Service not found' });

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    console.error('deleteService error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
