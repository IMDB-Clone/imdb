"use strict";

var express = require('express');

var fs = require('fs');

var path = require('path');

var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
var PORT = 3001; // Corrected the path here

var jsonFilePath = path.join('C:\\Desktop\\278\\imdb\\src\\components\\ReviewPopup', 'info.json');
app.post('/api/save-review', function (req, res) {
  var newReview = req.body;
  fs.readFile(jsonFilePath, function (err, data) {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    var reviews;

    try {
      reviews = JSON.parse(data);
    } catch (parseErr) {
      // Handle potential JSON parsing error
      res.status(500).send('Error parsing JSON data');
      return;
    }

    reviews.push(newReview);
    fs.writeFile(jsonFilePath, JSON.stringify(reviews, null, 2), function (err) {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }

      res.status(200).send('Review saved');
    });
  });
});
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});