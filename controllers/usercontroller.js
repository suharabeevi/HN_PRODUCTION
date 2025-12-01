// const Category = require('../models/categorymodel')
const Tour = require("../models/tourmodel");
// const Blog = require("../models/blogmodel");
const mongoose = require('mongoose');
// const Ticket = require('../models/ticketmodel')


module.exports = {
userhome: async (req, res) => {
    try {
      // Fetch all tours (you can add filters or limits later)
      const tours = await Tour.find({}, "title subtitle duration groupSize price images tourPlace").lean();

      // Render the home page and pass tours
      res.render("user/home", { tours });
    } catch (error) {
      console.error("Error fetching home page:", error);
      res.status(400).json({
        message: "Error fetching home page",
        error: error.message,
      });
    }
  },


    getservicepage: async (req, res) => {
        try {
            const category = await Category.find({})


// Fetch tours for each category
const categoryDetailss = await Promise.all(category.map(async (category) => {
    // Fetch tours associated with the current category
    const tours = await Tour.find({ category: category._id }).sort({ priority: 1 })

    // Add tours data to category
    return {
        ...category._doc, // Spread original category fields
        tours, // Add tours to the category
    };
}));
            res.render("user/service", {
                category,
                categoryDetailss,
                activePage: "service" // Set the active page dynamically
            });
        } catch (error) {
            console.error("Error fetching service page:", error);
            res.status(400).json({ message: "Error fetching service page", error: error.message });
        }
    },
    getcontactpage: async (req, res) => {
        try {

            res.render("user/contact", {
              
            });
        } catch (error) {
            console.error("Error fetching contact page:", error);
            res.status(400).json({ message: "Error fetching contact page", error: error.message });
        }
    },
    getprivacypolicypage: async (req, res) => {
        try {
            const category = await Category.find({})


// Fetch tours for each category
const categoryDetailss = await Promise.all(category.map(async (category) => {
    // Fetch tours associated with the current category
    const tours = await Tour.find({ category: category._id }).sort({ priority: 1 })

    // Add tours data to category
    return {
        ...category._doc, // Spread original category fields
        tours, // Add tours to the category
    };
}));
            res.render("user/privacypolicy", {
                category,
                categoryDetailss,
                activePage: "privacypolicy" // Set the active page dynamically
            });
        } catch (error) {
            console.error("Error fetching privacypolicy page:", error);
            res.status(400).json({ message: "Error fetching privacypolicy page", error: error.message });
        }
    },
    gettermsconditionpage: async (req, res) => {
        try {
            const category = await Category.find({})


// Fetch tours for each category
const categoryDetailss = await Promise.all(category.map(async (category) => {
    // Fetch tours associated with the current category
    const tours = await Tour.find({ category: category._id }).sort({ priority: 1 })

    // Add tours data to category
    return {
        ...category._doc, // Spread original category fields
        tours, // Add tours to the category
    };
}));
            res.render("user/termscondition", {
                category,
                categoryDetailss,
                activePage: "termscondition" // Set the active page dynamically
            });
        } catch (error) {
            console.error("Error fetching termscondition page:", error);
            res.status(400).json({ message: "Error fetching termscondition page", error: error.message });
        }
    },
    getaboutpage: async (req, res) => {
        try {
        res.render("user/about", {
               
            });
        } catch (error) {
            console.error("Error fetching about page:", error);
            res.status(400).json({ message: "Error fetching about page", error: error.message });
        }
    },
    getCategoryWiseTours: async (req, res) => {
        try {
            const { id, page = 1 } = req.query; // Get category ID and page number from query string
    
            // Validate id
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid or missing category ID" });
            }
    
            const limit = 8; // Number of tours per page
            const skip = (page - 1) * limit; // Calculate documents to skip
    
            // Fetch all categories
            const categories = await Category.find({}).limit();
            const category = await Category.find({});
    
            // Fetch tours for each category
            const categoryDetailss = await Promise.all(category.map(async (category) => {
                const tours = await Tour.find({ category: category._id });
                return {
                    ...category._doc, // Spread original category fields
                    tours, // Add tours to the category
                };
            }));
    
            // Find the category by its _id
            const categoryData = await Category.findById(id);
            if (!categoryData) {
                return res.status(404).json({ message: "Category not found" });
            }
    
            // Find tours that match the specified category with pagination
            const tours = await Tour.find({ category: id })
                .populate("category", "name") // Populate the category to include its name
                .sort({ priority: 1 }) // Sort by priority (you can change the sort order if needed)
                .skip(skip) // Skip documents for pagination
                .limit(limit) // Limit the number of documents
                .exec();
    
            // Total number of tours for the category
            const totalTours = await Tour.countDocuments({ category: id });
    
            // Total pages calculation
            const totalPages = Math.ceil(totalTours / limit);
    
            res.render("user/tours", {
                tours,
                category: categories,
                categoryDetailss,
                categoryName: categoryData.name, // Pass the category name
                activePage: "Tours", // Set the active page dynamically
                currentPage: parseInt(page), // Current page
                totalPages, // Total pages
                categoryId: id // Pass the category ID to the frontend
            });
        } catch (error) {
            res.status(400).json({ message: "Error fetching tours", error: error.message });
        }
    },
    gettourpage: async (req, res) => {
    
        try {
            // Retrieve all categories for rendering
               const tours = await Tour.find()

    
            // Render the tour details page
            res.render("user/tour",{tours }

            );
        } catch (error) {
            // Handle errors and send a response
            res.status(400).json({ message: "Error fetching tour details", error: error.message });
        }
    },
getpertour : async (req, res) => {
  try {
    const tourId = req.query.id; // ✅ using query now
    if (!tourId) {
      return res.status(400).send("Tour ID required");
    }

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).send("Tour not found");
    }

    res.render("user/tour-details", { tour });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching tour details", 
      error: error.message 
    });
  }
},
    getblogpage: async (req, res) => {
        try {
            const category = await Category.find({})


// Fetch tours for each category
const categoryDetailss = await Promise.all(category.map(async (category) => {
    // Fetch tours associated with the current category
    const tours = await Tour.find({ category: category._id }).sort({ priority: 1 })

    // Add tours data to category
    return {
        ...category._doc, // Spread original category fields
        tours, // Add tours to the category
    };
}));
            const blog = await Blog.find()
            res.render("user/blog", {
                category,
                categoryDetailss,
                blog,
                activePage: "blog" // Set the active page dynamically
            });
        } catch (error) {
            console.error("Error fetching about page:", error);
            res.status(400).json({ message: "Error fetching about page", error: error.message });
        }
    },
    getBlogdetailsPage : async (req, res) => {
        try {
            const category = await Category.find({})


            // Fetch tours for each category
            const categoryDetailss = await Promise.all(category.map(async (category) => {
                // Fetch tours associated with the current category
                const tours = await Tour.find({ category: category._id }).sort({ priority: 1 })
            
                // Add tours data to category
                return {
                    ...category._doc, // Spread original category fields
                    tours, // Add tours to the category
                };
            }));
            const blogs = await Blog.find()

            const { blogId } = req.query;
            // Validate that the blogId is provided
            if (!blogId) {
                return res.status(400).send('Blog ID is required');
            }
            // Fetch the blog details from the database
            const blog = await Blog.findById(blogId);
            // Check if the blog exists
            if (!blog) {
                return res.status(404).send('Blog not found');
            }
            // Render the blog details page with the blog data
            res.render('user/blogdetails', { blog,
                blogs,
                category,
                categoryDetailss,
                activePage: "blog" // Set the active page dynamically
            });
        } catch (error) {
            console.error('Error fetching blog details:', error);
            res.status(500).send('Server error');
        }
    },
    searchtour: async (req, res) => {
        const searchQuery = req.query.tours || '';  // Get the search query if any
        try {
            let tours;
            if (searchQuery) {
                // If a search query is provided, search by tour name
                tours = await Tour.find({
                    tourName: { $regex: searchQuery, $options: 'i' }  // Case-insensitive search
                });
            } else {
                // If no search query, return all tours
                tours = await Tour.find();
            }
    
            if (tours.length === 0) {
                return res.status(404).json({ message: 'No tours found' });  // Return 404 if no tours found
            }
    
            res.json(tours);  // Return the tours as JSON
        } catch (error) {
            console.error('Error fetching tours:', error);
            res.status(500).send('Error fetching tours');
        }
    },
    ticketpge: async (req,res)=>{
        try {
            const tickets = await Ticket.find();
            const category = await Category.find({})
    // Fetch tours for each category
    const categoryDetailss = await Promise.all(category.map(async (category) => {
    // Fetch tours associated with the current category
    const tours = await Tour.find({ category: category._id }).sort({ priority: 1 })
    
    // Add tours data to category
    return {
        ...category._doc, // Spread original category fields
        tours, // Add tours to the category
    };
    }));
            res.render("user/tickets", {
                category,
                categoryDetailss,
                activePage: "Tickets" ,// Set the active page dynamically
                tickets
            });
        } catch (error) {
            console.error("Error fetching Tickets page:", error);
            res.status(400).json({ message: "Error fetching Tickets page", error: error.message });
        }
    }
}
