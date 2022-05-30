const db = require("../models");
const axios = require("axios");
const url = require('url');

const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const NYT_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Example:
// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&q=Nuclear Subs&begin_date=19800101&end_date=19901231

module.exports = {
    // Return a list of articles based on search criteria
    // If already saved, return the db version instead (with 'saved:true')
    fetch: function(req, res) {
        let articleList = [];
        let parts = url.parse(req.url, true);
        let query = parts.query;
        let q = query.q ? "&q=" + query.q : "";
        let beginDate = query.beginDate ? "&begin_date=" + query.beginDate : "";
        let endDate = query.endDate ? "&end_date=" + query.endDate : "";
        let fl = "&fl=web_url,pub_date,headline,byline,multimedia";

        let nytUrl = NYT_URL + '?api-key=' + API_KEY + q + beginDate + endDate + fl;
        console.log("nytUrl: " + nytUrl);

        // Fetch articles from NYT based on search criteria
        axios.get(nytUrl)
        .then(function(response) {
            // console.log("response from: " + nytUrl);
            // console.log(response.data.response.docs);

            let resList = response.data.response.docs;
            let refinedList = resList.map(item => {
                // console.log(item.headline.main);
                // console.log(item.multimedia);
                // images = item.multimedia.map(image => {
                //     let mm = { url   : image.url,
                //                height: image.height,
                //                width : image.width 
                //              };
                //     console.log(mm);
                // });
                obj = {
                    url   : item.web_url,
                    title : item.headline.main,
                    date  : item.pub_date,
                    byline: item.byline ? item.byline.original : "",
                    image : item.multimedia.length > 0 ? 
                            "https://www.nytimes.com/" + item.multimedia[0].url : null,
                    saved : false,
                };
                // console.log(obj);
                return obj;
            })
            res.json(refinedList);
        })
        .catch(function(error) {
            let status = 400;
            let message = "Bad Request";
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                status = error.response.status;
                message = error.response.data.message;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            //   console.log(error.config);
            res.status(status).send(message);
        });        
    }
};



// // Defining methods for the nytController
// module.exports = {
//   findAll: function(req, res) {
//     console.log("findAll");
//     db.Article
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     console.log("create");
//     db.Article
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     console.log("remove");
//     db.Article
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
// };
