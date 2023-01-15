const { urlencoded } = require('express');
const express = require('express')
const mongoose = require('mongoose')
const Event = require('./models/events')
const app = express();
app.use(express.urlencoded({ extended: true }))
const PORT = 3000;
const mongodb = '/// Your mongodb url ///'
mongoose.set('strictQuery', false);
mongoose.connect(mongodb).then(() => console.log('Connected')).catch(err => console.log(err))

app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.redirect('/get-events');
})

app.get('/get-events', (req, res) => {
    Event.find().then(result => {
        res.render('index', { events: result })
    }).catch(err => console.log(err))
})

app.get('/add-event', (req, res) => {
    res.render('add-event')
})

app.get('/events/:id', (req,res) => {
    const event = req.params.id
    Event.findById(event).then(result =>{ 
        res.render('event-details', { event: result })
    }).catch(err => console.log(err))
})

app.post('/events', (req, res) => {
    const event = Event(req.body)
    event.save().then(() => {
        res.redirect('/get-events')
    }).catch(err => console.log(err))
})

app.delete('/events/:id', (req, res) => {
    const id = req.params.id
    Event.findByIdAndDelete(id).then(result => {
        res.json({redirect: '/get-events'})
    }).catch(err => console.log(err))
})


app.put('/events/:id', (req, res) => {
    const id = req.params.id
    Event.findByIdAndUpdate(id, req.body).then(result => {
        res.json({message: "Updated successfuly"})
    }).catch(err => console.log(err))
})


app.use((req, res) => {
    res.render('error')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})