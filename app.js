const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const URL = require('./models/URL')
const shortener = require('./utils/shortener')

// 資料庫連線設定
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定 body-parser
app.use(express.urlencoded({ extended: true }))

// 設定 view-engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 主頁路由設定
app.get('/', (req, res) =>
  res.render('index')
)

app.post('/', (req, res) => {
  const full = req.body.full
  if (!full) return res.redirect('/')

  // 產生五碼隨機字元
  const shortenURL = shortener(5)

  // 到資料庫找資料，若找不到就新增一個
  URL.findOne({ full: full })
    .then(data => data ? data : URL.create({ full: full, short: shortenURL}))
    .then(data => res.render('index', {
      origin: req.headers.origin,
      shortenURL: data.short
     }))
     .catch(error => console.log(error))
})

app.listen('3000', () => {
  console.log('App is running on localhost:3000')
})