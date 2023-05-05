const express = require('express');
const router = express.Router();
const Supplement = require('../models/supplement');

// Get all
router.get("/", async (req, res) => {
    try{
        const supplements = await Supplement.find()
        res.json(supplements)
    } catch (err) {
        res.status(500).json({message: err.message})    
    }
})

// Get one
router.get("/:name", getSupplement, (req, res) => {
    res.status(201).json(res.supplement)
})
// router.get("/:id", getSupplement, (req, res) => {
//     // res.send(res.supplement.name)
//     res.json(res.supplement)
// })

// Create one
router.post("/", async (req, res) => {
    const supplement = new Supplement({
        name: req.body.name,
        healthBenefits: req.body.healthBenefits,
        healthRisks: req.body.healthRisks,
        ideal_dosage_mg: req.body.ideal_dosage_mg,
        toxic_dosage_mg: req.body.toxic_dosage_mg,
        ideal_time: req.body.ideal_time,
        references: req.body.references
    })

    try {
        const newSupplement = await supplement.save()
        res.status(201).json(newSupplement)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Update
// router.patch("/:id", getSupplement, async (req, res) => {
//     if (req.body.name != null){
//         res.supplement.name = req.body.name
//     }
//     if (req.body.subscribedToChannel != null) {
//         res.supplement.subscribedToChannel = req.body.subscribedToChannel
//     }
//     try {
//         const updatedSupplement = await res.supplement.save()
//         res.json(updatedSupplement)
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
// })

// Delete
router.delete("/:id", getSupplement, async (req, res) => {
    try {
        await res.supplement.deleteOne()
        res.json({message: "Deleted sub"})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})


async function getSupplement(req, res, next) {
    let supplement  
    try {
        var query = decodeURIComponent(req.params.name)
        supplement = await Supplement.find({name: { $regex : new RegExp(query, "i")} })
        if (supplement.length == 0){
            return res.status(404).json({message: "Cannot find supplement"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.supplement = supplement
    next()
}
// async function getSupplement(req, res, next) {
//     let supplement  
//     try {
//         supplement = await Supplement.findById(req.params.id)
//         if (supplement == null){
//             return res.status(404).json({message: "Cannot find sub"})
//         }
//     } catch (err) {
//         return res.status(500).json({message: err.message})
//     }

//     res.supplement = supplement
//     next()
// }


module.exports = router;