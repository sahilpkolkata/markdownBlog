const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/article')

const articleRoutes = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser:true , useUnifiedTopology: true})
.then(()=>console.log('connected'))
.catch(e=>console.log(e));
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))



app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc' })
    res.render('articles/index', {articles: articles})
})

app.use('/articles',articleRoutes)

app.listen(5000, ()=>{
    console.log("Server is running at port 5000")
})

