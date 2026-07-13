const {nanoid} = require('nanoid');
const URL = require('../models/urlModel');
async function generate(req, res){
    const shortId = nanoid(8);
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: 'url is required'})

    }
    await URL.create({
        shortId: shortId,
        redirectUrl: req.body.url,
        visitHistory: []
    })
return res.status(200).json({shortId: shortId})
}


async function getAnalytics(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    if(!entry){
        return res.status(404).json({error: 'URL not found'})
    }
    return res.status(200).json({totalClicks: entry.visitHistory.length, analytics: entry.visitHistory})
}

module.exports = {generate, getAnalytics}