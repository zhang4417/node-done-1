#!/usr/bin/env node

const api = require('./index.js')
const program = require('commander')
const pkg = require('./package.json')

program
	.version(pkg.version)
program
	.option('-d,--demo', 'description of demo')
program
	.command('add')
	.description('add some files')
	.action((...args) => {
		const title = args.slice(0, -1).join(' ')
		api.add(title).then(() => console.log('添加成功'))
	})
program
	.command('clear')
	.description('clear some files')
	.action(() => {
		api.clear()
	})
program.parse(process.argv)

if (process.argv.length === 2) {
	api.showAll()
}