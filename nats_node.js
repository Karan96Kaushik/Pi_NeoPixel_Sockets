const NATS = require('nats')

const nc = NATS.connect({url:"nats://raspberrypi.local:4222", json: true })

nc.on('connect', () => {
  nc.on('error', (err) => {
    console.log(err)
  })

  nc.subscribe('greeting', (msg, reply) => {
    // msg is a parsed JSON object object
    if (msg.name && msg.reply) {
      nc.publish(reply, { greeting: 'hello ' + msg.name })
    }
  })

  // As with all inputs from unknown sources, if you don't trust the data
  // you should verify it prior to accessing it. While JSON is safe because
  // it doesn't export functions, it is still possible for a client to
  // cause issues to a downstream consumer that is not written carefully
  nc.subscribe('unsafe', function (msg) {
    // for example a client could inject a bogus `toString` property
    // which could cause your client to crash should you try to
    // concatenation with the `+` like this:
    // console.log("received", msg + "here");
    // `TypeError: Cannot convert object to primitive value`
    // Note that simple `console.log(msg)` is fine.
    if (Object.hasOwnProperty.call(msg, 'toString')) {
      console.log('tricky - trying to crash me:', msg.toString)
      return
    }

    // of course this is no different than using a value that is
    // expected in one format (say a number), but the client provides
    // a string:
    if (isNaN(msg.amount) === false) {
      // do something with the number
    }
    // ...
  })

  // the bad guy
  nc.publish('unsafe', { toString: 'no good' })

  nc.flush(function () {
    nc.close()
  })
})