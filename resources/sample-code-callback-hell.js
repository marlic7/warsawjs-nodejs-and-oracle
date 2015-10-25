/**
 * Raczej nie będę o tym mówił (nie ma sensu wdawać się w async vs promises)
 * lepiej skupić się na oracle driver
 */

// callback hell
app.get('/some_resource', function(req, res) {
    db.query('SELECT a ...', function (err, a) {
        if (err) return res.end(err);

        db.query('SELECT b WHERE a = ?', [a], function (err, b) {
            if (err) return res.end(err);

            db.query('SELECT c WHERE b = ?', function (err, c) {
                if (err) return res.end(err);

                res.end(c);
            });
        });
    });
});

// named function
app.get('/some_resource', function(req, res) {
    db.query('SELECT a ...', queryACallback);

    function queryACallback(err, a) {
        if (err) return res.end(err);
        db.query('SELECT b WHERE a = ?', [a], queryBCallback);
    }

    function queryBCallback(err, b) {
        if (err) return res.end(err);
        db.query('SELECT c WHERE b = ?', [b], queryCCallback);
    }

    function queryCCallback(err, c) {
        if (err) return res.end(err);
        res.end(c);
    }
});