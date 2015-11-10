var async      = require('async'),
    dalFactory = require('node-dal'),
    cfg        = {
        connection: {
            user:           "testy",
            password:       "testy123",
            connectString:  "localhost/XE",
            poolMax:        10,
            poolMin:        1
        },
        getConnMaxProbes:   50,  // times
        getConnWaitMinTime: 100, // miliseconds
        getConnWaitMaxTime: 200 // miliseconds
    },
    sqls = [],
    i = 15;

while(i--) { sqls.push('SELECT SYSDATE FROM DUAL'); }

dalFactory('oracledb', cfg, function(err, dal) {
    var executeSql = function(sql, cb) {
        dal.selectOneValueSql(sql, [], function(err, result) {
            cb(null, result);
        });
    };

    async.map(sqls, executeSql, function(err, results) {
        callback(null, results);
    });
});



//

var async = require('async'),
    oracledb = require('oracledb'),
    cfg = {
        user:           "username",
        password:       "password",
        connectString:  "localhost/XE",
        poolMax:        10,
        poolMin:        2,
        poolIncrement:  1,
        poolTimeout:    60
    },
    sqls = [],
    i = 15;

while(i--) { sqls.push('SELECT SYSDATE FROM DUAL'); }

oracledb.createPool(cfg, function(err, pool) {
    var executeSql = function(sql, cb) {
        pool.getConnection(function(err, connection) {
            connection.execute(sql, [], function(err, results) {
                cb(null, results);
            });
        });
    };

    async.map(sqls, executeSql, function(err, results) {
        callback(null, results);
    });
});




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
