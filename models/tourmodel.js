const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  activities: [{ type: String }], // multiple optional activities
  overnight: { type: String, default: "" },
  included: [{ type: String }],   // optional includes for the day
});

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    tourPlace: { type: String, required: true },
    duration: { type: String },
    groupSize: { type: Number },
    peopleType: [{ type: String, default: [] }],

    price: { type: String, required: true },
    addons: { type: String },
    kidsPolicy: { type: String },

    airport: { type: String },
    flightSuggestion: { type: String },

    whyTravelWithUs: [{ type: String, default: [] }],
    tripOverview: { type: String },

    itinerary: [itinerarySchema],  // array of days with multiple activities

    included: [{ type: String, default: [] }],
    notIncluded: [{ type: String, default: [] }],

    paymentDetails: {
      pricePerPerson: { type: Number, default: 0 },
      bankDetails: {
        accountName: { type: String, default: "" },
        sortCode: { type: String, default: "" },
        accountNumber: { type: String, default: "" },
        iban: { type: String, default: "" },
      },
    },

    contact: {
      whatsapp: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    images: [{ type: String, default: [] }],
  isActive: { type: Boolean, default: true } // <-- for shallow delete

  },

  { timestamps: true }
);

module.exports = mongoose.model('Tour', tourSchema);
