const request = require('request');
const puppeteer = require('puppeteer');
const bdd = require(`../bdd`);

module.exports = function (app) {
    app.post('/leboncoin1', leboncoin1);
    app.post('/leboncoin2', leboncoin2);
}

const leboncoin_limit_api = 100;

function leboncoin1(req, res){
    request({
        method: 'POST',
        uri: 'https://api.leboncoin.fr/finder/search',
        body: JSON.stringify({
            "filters":
                {
                    "category": {
                        "id": "2"
                    },
                    "enums": {
                        "ad_type": ["offer"],
                        "brand": ["Tesla"]
                    },
                    "keywords":{},
                    "location":{},
                    "ranges":{}
                },
            "limit": 100,
            "offset": (req.query.offset || 0)
        })
    }, (error, response, body) => {
        body = JSON.parse(body);
        if (error)
            res.status(500).json(-1);
        body.ads.forEach(ad => {
            //bdd.Products.Create({name: ad.subject, description: ad.body, url: ad.url, price: ad.price[0], "source.id": ad.list_id, "source.date": ad.index_date, pictures: ad.images.urls_thumb});
            bdd.Products.UpdateOrCreate({"source.id": ad.list_id}, {name: ad.subject, description: ad.body, url: ad.url, price: ad.price[0], "source.id": ad.list_id, "source.date": ad.index_date, pictures: ad.images.urls_thumb}, () => {})
        });
        if (body.total <= leboncoin_limit_api || body.total <= req.query.offset + leboncoin_limit_api)
            res.json(1);
        else {
            req.query.offset = (req.query.offset || 0) + leboncoin_limit_api;
            leboncoin1(req, res);
        }
    });
};

async function leboncoin2(req, res){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.emulate({viewport: {width: 1920, height: 1080}, userAgent: ''});    
    await page.goto('https://www.leboncoin.fr/recherche/?category=2&brand=Tesla', {waitUntil: 'load', timeout: 0});
    await page.waitForSelector('#application', {timeout: 0});
    await page.waitForSelector('._2tubl', {timeout: 0});
    const titles = await page.$$eval('._2tubl', anchors => {
        return anchors.map(anchor => {
            return ({
                'title': anchor.innerText
            })
        })
    })    
    await page.waitForSelector('._1NfL7', {timeout: 0});
    const prices = await page.$$eval('._1NfL7', anchors => {
        return anchors.map(anchor => {
            return ({
                'price': anchor.innerText.replace(" €")
            })
        })
    })
    console.log(titles, prices);
    //await page.click('#next')
    await browser.close();
    res.json(1);


    /*const URL = 
    puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080})
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1')
    
        await page.goto(URL, {waitUntil: 'networkidle0'});
        await page.waitForSelector('#application');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    
        
    
        // let's close the browser
        await browser.close();
    }).catch(function(error) {
        console.log(error);
        process.exit();
    });*/
};