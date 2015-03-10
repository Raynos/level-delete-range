var EndStream = require("end-stream")

module.exports = deleteRange

function deleteRange(db, options, callback) {
    options = options || {}
    callback = callback || noop

    var stream = db.createKeyStream(options)

    stream.pipe(EndStream(function (key, callback) {
        db.del(key, callback)
    })).on("finish", callback)
}

function noop() {}
