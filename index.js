const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
	const task = {
		title: title,
		done: false
	}
	const list = await db.read()
	list.push(task)
	await db.write(list)
}
module.exports.clear = async () => {
	const list = []
	await db.write(list)
}
module.exports.showAll = async () => {
	const list = await db.read()
	inquirer.prompt([
		{
			type: 'list',
			name: 'task',
			message: '请选择你的任务',
			choices: [{ name: '退出', value: '-1' }, ...list.map((item, index) => { return { name: `${item.done ? '[x]' : '[_]'} - ${item.title}`, value: index.toString() } }), { name: '+ 创建', value: '-2' }]
		}
	]).then((answers) => {
		const index = parseInt(answers.task)
		if (index >= 0) {
			showOffAction(list, index)
		}
		if (index === -2) {
			creatTask(list)
		}
	})
}

function isDone(list, index) {
	list[index].done = true
	db.write(list)
}
function notDone(list, index) {
	list[index].done = false
	db.write(list)
}
function changeTitle(list, index) {
	inquirer.prompt([{
		type: 'input',
		name: 'title',
		message: '修改标题',
		default: list[index].title,
	}]).then(answer => {
		list[index].title = answer.title
		db.write(list)
	})
}
function remove(list, index) {
	list.splice(index, 1)
	db.write(list)
}
function quite() { return }
function showOffAction(list, index) {
	inquirer.prompt([
		{
			type: 'list',
			name: 'action',
			message: '请选择你将要进行的操作',
			choices: [{ name: '退出', value: 'quit' }, { name: '已完成', value: 'isDone' }, { name: '未完成', value: 'notDone' }, { name: '改标题', value: 'changeTitle' }, { name: '删除', value: 'remove' }]
		}
	]).then((answers) => {
		const actions = { quite, isDone, notDone, changeTitle, remove }
		const currentAction = actions[answers.action]
		currentAction && currentAction(list, index)
	})
}
function creatTask(list) {
	inquirer.prompt([{
		type: 'input',
		name: 'creat',
		message: '创建任务',
	}]).then(answer => {
		list.push({ title: answer.creat, done: false })
		db.write(list)
	})
}