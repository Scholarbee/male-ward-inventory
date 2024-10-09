const mongoose = require("mongoose");

const WFSchema = mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    year: {
      type: String,
      required: true,
    },
    quarter: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    funds: [
      {
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        patient: { type: String },
        amount: { type: Number },
        toManager: {
          type: boolean,
          default: false,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Wardfund = mongoose.model("Wardfund", WFSchema);
module.exports = Wardfund;
