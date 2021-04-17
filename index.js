const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');

function getParams(argv) {
    const rangeStart = argv.start || 1;
    const rangeEnd = argv.end || 20;
    if (rangeEnd < rangeStart) return {error: 'Некорректный ввод'}
    return {rangeStart, rangeEnd}
}

function getNextColor() {
    let current = -1;
    return function () {
        if (current > 1) current = -1
        current++;
        return getColor(current);
    }
}

function getColor(idx) {
    const arr = ['green', 'yellow', 'red'];
    return arr[idx]
}

function showPrimesByRange(rangeStart, rangeEnd) {
    const color = getNextColor();
    const arr = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
        if (isPrime(i)) arr.push({number: i, color: color()});
    }
    if (!arr.length) {
        console.log(chalk.bgRed(`Простых чисел в промежутке [${rangeStart};${rangeEnd}] нет`));
    } else {
        arr.forEach(elem => {
            console.log(chalk[elem.color](elem.number))
        })
    }
}

function isPrime(number) {
    if (number < 2) return false
    else if (number === 2) return true
    else if (!(number % 2)) return false;
    for (let i = 3; i <= Math.sqrt(number); i++) {
        if (!(number % i)) return false;
    }
    return true;
}

const data = getParams(argv);
if (data.error) {
    console.log(chalk.bgRed(data.error));
} else {
    const {rangeStart, rangeEnd} = data;
    showPrimesByRange(rangeStart, rangeEnd);
}