const fs = require('fs');
const lazy = require('lazy');

const readFile = (fileName, callback) => new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(fileName);
    new lazy(readStream)
        .lines
        .forEach(callback);
    // callback действует на строку
});

function findString(line, str) {
    return line && line.indexOf(str) !== -1;
}

(async () => {
    const ip1 = '89.123.1.41';
    const ip2 = '34.48.240.111';

    const writeStream1 = fs.createWriteStream(`${ip1}_requests.log`);
    const writeStream2 = fs.createWriteStream(`${ip2}_requests.log`);

    await readFile('./access.log', (line) => {
        if (findString(line, ip1)) {
            writeStream1.write(line + '\n');
        } else if (findString(line, ip2)) {
            writeStream2.write(line + '\n');
        }
    });

    writeStream1.end();
    writeStream2.end();
})();



