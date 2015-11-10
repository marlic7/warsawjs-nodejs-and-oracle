var async      = require('async'),
    dalFactory = require('node-dal'),
    cfg        = {
        connection: {
            user:           "warsawjs",
            password:       "warsawjs",
            connectString:  "localhost/XE",
            poolMax:        10,
            poolMin:        1
        },
        getConnMaxProbes:   100, // times
        getConnWaitMinTime: 200, // miliseconds
        getConnWaitMaxTime: 500  // miliseconds
    },
    sqls = [],
    i    = 15;

while(i--) { sqls.push('SELECT SYSDATE FROM DUAL'); }

dalFactory('oracledb', cfg, function(err, dal) {
    if(err) {
        callback(new Error(err));
        return;
    }

    var executeSql = function(sql, cb) {
        //noinspection JSUnresolvedFunction
        dal.selectOneValueSql(sql, [], function(err, result) {
            if(err) {
                cb(new Error(err));
                return;
            }
            cb(null, result);
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
