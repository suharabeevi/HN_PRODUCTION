const cloudinary = require('cloudinary').v2;
const Project = require('../models/projectmodel');
const ProjectCategory = require('../models/projectcategorymodel');
const { uploadToCloudinaryWithPublicId } = require('../config/multer');

// Admin: render add category page
exports.getAddCategoryPage = async (req, res) => {
  try {
    res.render('admin/addprojectcategory');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin: create category
exports.postAddCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const existing = await ProjectCategory.findOne({ name });
    if (existing) return res.status(400).json({ success: false, message: 'Category exists' });
    const cat = await ProjectCategory.create({ name, description });
    res.json({ success: true, message: 'Category created', category: cat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: list categories
exports.getAllCategoriesPage = async (req, res) => {
  try {
    const categories = await ProjectCategory.find({}).sort('name').lean();
    res.render('admin/allprojectcategories', { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin: render add project page
exports.getAddProjectPage = async (req, res) => {
  try {
    const categories = await ProjectCategory.find({ isActive: true }).sort('name').lean();
    res.render('admin/addproject', { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin: create project with multiple images
exports.createProject = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    if (!title || !categoryId) return res.status(400).json({ success: false, message: 'Title and category required' });

    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinaryWithPublicId(file.path, 'image');
        images.push({ url: uploadResult.url, public_id: uploadResult.public_id });
      }
    }

    const project = await Project.create({
      category: categoryId,
      title,
      description,
      images,
    });

    res.json({ success: true, message: 'Project created', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: list all projects
exports.getAllProjectsPage = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('category', 'name').sort({ createdAt: -1 }).lean();
    res.render('admin/allprojects', { projects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin: render edit project page
exports.getEditProjectPage = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate('category').lean();
    if (!project) return res.status(404).send('Project not found');
    const categories = await ProjectCategory.find({ isActive: true }).sort('name').lean();
    res.render('admin/editproject', { project, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin: update project (append new images)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId } = req.body;

    const updateData = {
      title,
      description,
      category: categoryId,
    };

    const newImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinaryWithPublicId(file.path, 'image');
        newImages.push({ url: uploadResult.url, public_id: uploadResult.public_id });
      }
    }

    if (newImages.length > 0) {
      const existing = await Project.findById(id).select('images');
      const existingImages = existing && Array.isArray(existing.images) ? existing.images : [];
      updateData.images = [...existingImages, ...newImages];
    }

    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project updated', project: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: delete a single image from a project
exports.deleteProjectImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, publicId } = req.query;
    if (!imageUrl && !publicId) return res.status(400).json({ success: false, message: 'imageUrl or publicId is required' });

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      } catch (cloudErr) {
        console.error('Cloudinary delete warning:', cloudErr);
      }
    }

    const beforeCount = (project.images || []).length;
    project.images = (project.images || []).filter(img => {
      if (!img) return false;
      if (typeof img === 'string') {
        return imageUrl ? img !== imageUrl : true;
      }
      if (publicId) return img.public_id !== publicId;
      if (imageUrl) return img.url !== imageUrl;
      return true;
    });
    const afterCount = project.images.length;

    if (beforeCount === afterCount) return res.status(404).json({ success: false, message: 'Image not found in project' });

    await project.save();
    res.json({ success: true, message: 'Image deleted successfully', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const images = project.images || [];
    for (const img of images) {
      const publicId = img && typeof img === 'object' ? img.public_id : null;
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        } catch (cloudErr) {
          console.error('Cloudinary delete warning:', cloudErr);
        }
      }
    }

    await Project.findByIdAndDelete(id);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// API: get categories
exports.getCategoriesApi = async (req, res) => {
  try {
    const categories = await ProjectCategory.find({ isActive: true }).sort('name').lean();
    res.json({ success: true, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// API: get projects by category (categoryId or slug)
exports.getProjectsByCategoryApi = async (req, res) => {
  try {
    const { categoryId, slug } = req.query;
    let category = null;
    if (categoryId) category = await ProjectCategory.findById(categoryId).lean();
    else if (slug) category = await ProjectCategory.findOne({ slug }).lean();
    else return res.status(400).json({ success: false, message: 'categoryId or slug required' });

    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    const projects = await Project.find({ category: category._id, isActive: { $ne: false } }).lean();
    res.json({ success: true, category, projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
