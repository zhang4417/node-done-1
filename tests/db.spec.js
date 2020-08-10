const fs = require('fs');
const db = require('../db');
jest.mock('fs');

describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    it('readFunction', async () => {
        const data = [{ title: '买包', done: true }]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })
    it('writeFunction', async () => {
        const data = [{ title: '不买了', done: false }]
        fs.setWriteFileMock('/yyy', (path, data, callBack) => { callBack(null) })
        const list = await db.write(data, '/yyy')
        expect(list).toStrictEqual(JSON.stringify(data))
    })
}
)
