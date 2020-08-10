const fs = require('fs')
const path = require('path');
const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const dirPath = path.join(home, '.todo')

module.exports = {
    read(path = dirPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                let list
                if (error) reject(error)
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(file, path = dirPath) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(file)
            fs.writeFile(path, data + '\n', (error) => {
                if (error) reject(error);
                resolve(data)
            })
        })
    }
}
