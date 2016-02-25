import {exec} from 'child_process'

process.stdin.setEncoding('utf8');

var stdin = ""
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    stdin += chunk
  }
});

process.stdin.on('end', () => {
    stdin.split('\n').map(line => line.trim())
    .map(line =>
        line.match(/^([0-9][0-9]:[0-9][0-9]:[0-9][0-9]) (.*)$/)
    ).filter(line => !!line)
    .map(line => {
        return {
            time: line[1],
            title: line[2].replace(/[ .'"()]/g,'-').replace(/-{2,}/g, '-').replace(/-$/,'')+'.mp3'
        }
    })
    .map((line, index, array) => {
        if(!array[index+1])
            array.push({time: '99:99:99'})

        console.log(`ffmpeg -i "${process.argv[2]}" -acodec copy -to ${array[index+1].time || "99:99:99"} -ss ${line.time} "${line.title}"`)
        exec(`ffmpeg -i "${process.argv[2]}" -acodec copy -to ${array[index+1].time} -ss ${line.time} "${line.title}"`)
    })
});