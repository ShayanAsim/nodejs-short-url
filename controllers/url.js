const express = require("express");
const shortid = require("shortid"); // Import shortid correctly
const URL = require('../models/url');




async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate(); // Use shortid.generate() to generate a short ID
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        createdBy:req.user._id,
        visitHistory: []
    });

    return res.render("home",{id: shortId})
    return res.json({ id: shortId });
}


async function  handleGetAnalytics(req, res) {
    const shortid = req.params.shortId


    const result = await URL.findOne({ shortid})
    
    return res.status(200).json(
        {
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
        }
        )

}


module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
};
