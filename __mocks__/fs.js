const fs = jest.genMockFromModule('fs');//jest的fs
const _fs = jest.requireActual('fs')//node的fs
Object.assign(fs, _fs)

let readFileMocks = {}
fs.setReadFileMock = (path, error, data) => {
    readFileMocks[path] = [error, data]
}
fs.readFile = (path, options, callBack) => {
    if (callBack === undefined) callBack = options
    if (path in readFileMocks) {
        callBack(...readFileMocks[path])
    } else {
        _fs.readFile(path, options, callBack)
    }
}
let writeFileMocks = {}
fs.setWriteFileMock = (path, fn) => {
    writeFileMocks[path] = fn
}
fs.writeFile = (path, data, callBack) => {
    if (path in writeFileMocks) writeFileMocks[path](path, data, callBack)
    else {
        _fs.writeFile(path, data, callBack)
    }
}
fs.clearMocks = () => {
    readFileMocks = {}
    writeFileMocks = {}
}

module.exports = fs