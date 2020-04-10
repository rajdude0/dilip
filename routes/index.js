var express = require('express');
var router = express.Router();
var https = require('https');
const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://drdilip.testpress.in',
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
  debug: true
});
/* GET home page. */
router.get('*', async (req, res, next) => {
  try {
  const resp = await instance({
    url: req.originalUrl,
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "Authorization": req.headers["authorization"] || ''
    },
    data: req.body
  })
  console.log(resp.data);
  res.json(resp.data)
  } catch (e) {
     res.status(e.response.status);
    res.json({"Error":e.message })
  }
});

router.post('*', async (req, res, next) => {
  //res.write(`index { title: ${req.originalUrl}, body: ${JSON.stringify(req.body)} headers: ${JSON.stringify(req.headers)} }`);
  try {
    const resp = await instance({
      url: req.originalUrl,
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Authorization": req.headers["authorization"] || ''
      },
      data: req.body
    })
 
  console.log(resp.data);
    res.json(resp.data)
  } catch (e) {
    res.status(e.response.status);
    res.json({"Error":e.message })
  }
});


module.exports = router;
