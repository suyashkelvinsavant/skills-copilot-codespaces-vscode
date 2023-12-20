// Create web server
// Get the comments

var express = require('express');
var router = express.Router();
var fs = require('fs');

// Get the comments
router.get('/comments', function(req, res) {
    // Read the comments file
    fs.readFile('comments.json', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            // Send the comments file
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

// Add a comment
router.post('/comments', function(req, res) {
    // Get the comment
    var comment = req.body;
    // Read the comments file
    fs.readFile('comments.json', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
        } else {
            // Convert the comments to an array
            var comments = JSON.parse(data);
            // Add the comment to the array
            comments.push(comment);
            // Convert the comments back to JSON
            comments = JSON.stringify(comments, null, 4);
            // Write the comments back to the file
            fs.writeFile('comments.json', comments, function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error');
                } else {
                    // Send a success response
                    res.status(200).send('Success');
                }
            });
        }
    });
});

// Export the router
module.exports = router;