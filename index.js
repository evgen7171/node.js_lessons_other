const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');
const Emitter = require('events');
const emitter = new Emitter();

function getParams() {
    return argv._.map(str => moment(str, "HH-DD-MM-YYYY"));
}

class Timer {
    constructor(name, time) {
        this.name = name;
        this.time = time;
        this.isValid = time.isValid();
    }

    show() {
        const time = moment(this.time).diff(moment());
        if(time===0){
            // emit('stop')
        }else {
            console.log(`${this.name} ${new Date(time)}`)
        }
    }
}

function initTimers(...argTimers) {
    return argTimers.map(
        (argTimer, key) => new Timer(`timer${key + 1}`, argTimer)
    );
}

const argTimers = getParams();
const timers =
    argTimers.length ? initTimers(...argTimers) : initTimers([moment('1-0-1-0')]);

timers.forEach(timer => {
    if (timer.isValid)
        emitter.on('show', () => {
            timer.show();
        })
});

const run = async () => {
    emitter.emit('show');
    setTimeout(run, 1000);
};

run();
