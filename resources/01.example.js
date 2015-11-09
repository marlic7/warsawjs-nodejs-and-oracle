dal.selectOneValueSql('SELECT SYSDATE FROM DUAL',
                      [],
                      function(err, result) {
    if(err) {
        cb(new Error(err));
        return;
    }
    cb(null, result);
});

pool.getConnection(function(err, connection) {
    if (err) {
        cb(new Error(err));
        return;
    }
    connection.execute('SELECT SYSDATE FROM DUAL', [], function(err, result) {
        if (err) {
            cb(new Error(err));
            return;
        }

        connection.release(function(err) {
            if (err) {
                cb(new Error(err));
                return;
            }

            cb(null, result);
        });
    });
});

connection.execute("SELECT * FROM employees", [], { maxRows: 1000 },
    function(err, result) {
        // result.rows.length <= 1000
    }
);

var allRows = [];

function fetch() {
    var max = 200;
    result.resultSet.getRows(max, function(err, rows) {
        if (err)  { return; } // ...
        allRows = allRows.concat(rows);
        if (rows.length === max) {
            fetch();
        } else {
            result.resultSet.close(function(err) {
                if (err) { return; } // ...
                connection.release(function(err) {
                    if (err) { return; } // ...

                    cb(null, allRows);
                });
            });
        }
    });
}
fetch();


dal.selectAllRows({
    tbl: 'test_01',
    opt: { limit:10, page:5 },
    cb:  function(err, result) {

    }
});
