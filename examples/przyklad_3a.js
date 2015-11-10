var async    = require('async'),
    oracledb = require('oracledb'),
    cfg  = {
        user:           "warsawjs",
        password:       "warsawjs",
        connectString:  "localhost/XE",
        poolMax:        10,
        poolMin:        2
    },
    sqls = [],
    i    = 15;

while(i--) { sqls.push('SELECT SYSDATE FROM DUAL'); }

//noinspection JSUnresolvedFunction
oracledb.createPool(cfg, function(err, pool) {
    if(err) {
        callback(new Error(err));
        return;
    }
    var executeSql = function(sql, cb) {
        //noinspection JSUnresolvedFunction
        pool.getConnection(function(err, connection) {
            if(err) {
                cb(new Error(err));
                return;
            }
            //noinspection JSUnresolvedFunction
            connection.execute(sql, [], function(err, results) {
                if(err) {
                    cb(new Error(err));
                    return;
                }
                cb(null, results.rows[0][0]);
            });
        });
    };

    async.map(sqls, executeSql, function(err, results) {
        if(err) {
            callback(new Error(err));
            return;
        }
        callback(null, results);
    });
});


function callback(err, results) {
    if(err) {
        console.error(err.stack);
        return;
    }
    console.log(results);
}
