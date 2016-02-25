'use strict';

var _child_process = require('child_process');

process.stdin.setEncoding('utf8');

var stdin = "";
process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        stdin += chunk;
    }
});

process.stdin.on('end', function () {
    stdin.split('\n').map(function (line) {
        return line.trim();
    }).map(function (line) {
        return line.match(/^([0-9][0-9]:[0-9][0-9]:[0-9][0-9]) (.*)$/);
    }).filter(function (line) {
        return !!line;
    }).map(function (line) {
        return {
            time: line[1],
            title: line[2].replace(/[ .'"()]/g, '-').replace(/-{2,}/g, '-').replace(/-$/, '') + '.mp3'
        };
    }).map(function (line, index, array) {
        if (!array[index + 1]) array.push({ time: '99:99:99' });

        console.log('ffmpeg -i "' + process.argv[2] + '" -acodec copy -to ' + (array[index + 1].time || "99:99:99") + ' -ss ' + line.time + ' "' + line.title + '"');
        (0, _child_process.exec)('ffmpeg -i "' + process.argv[2] + '" -acodec copy -to ' + array[index + 1].time + ' -ss ' + line.time + ' "' + line.title + '"');
    });
});

