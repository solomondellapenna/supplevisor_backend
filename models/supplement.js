const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    healthBenefits: {
        type: Array,
        required: true
    },
    healthRisks: {
        type: Array,
        required: true,
    },
    ideal_dosage_mg: {
        type: Number,
        required: true
    },
    toxic_dosage_mg: {
        type: Number
    },
    ideal_time: {
        type: String
    },
    references: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Supplement', supplementSchema)