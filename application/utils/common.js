'use strict'

const Common = {
  getPostData: function (req, res, callback) {
    if (req.readable) {
      let content = ''
      let jsonError = {sucess: 0, message: 'NOT JSON'}
      req.on('data', function (data) {
        if (content.length > 1e6) {
          res.json({ error: 'Request entity too large.' }, 413)
        }
        content += data
      });

      req.on('end', function () {
        // Return the posted data.
        //TODO: need to handle non-json format error
        try {
          if (callback) callback(JSON.parse(content))
        } catch(e) {
          res.json(jsonError)
        }
      })
    }
    else {
      try{
        callback(JSON.parse(req.body))
      }catch(e) {
        res.json(jsonError)
      }
    }
  }
}

module.exports = Common
