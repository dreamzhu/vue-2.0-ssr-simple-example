/**
 * Created by Dreamzhu on 2016/10/4.
 */

const renderer = require('vue-server-renderer').createRenderer()
const Vue = require('vue')
const express = require('express')
const app = express()

const vm = new Vue({
	render (h) {
		return h('div', 'hello')
	}
})

renderer.renderToString(vm, (err, html) => {
	console.log(html) // -> <div server-rendered="true">hello</div>
});

// example usage with express
app.get('/', (req, res) => {
	const stream = renderer.renderToStream(vm)

	res.write(`<!DOCTYPE html><html><head><title>...</title></head><body>`)

	stream.on('data', chunk => {
		res.write(chunk)
	})

	stream.on('end', () => {
		res.end('</body></html>')
	})
})


const port = 8080
app.listen(port, '0.0.0.0', () => {
	console.log(`server started at localhost:${port}`)
})
