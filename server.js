const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')

const d = new Date();
a = JSON.stringify(d);
let time = d.getTime();
const minute = 1000 * 60;

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

app.use(express.json())

// const friends = {
//     'james': 'friend',
//     'larry': 'friend',
//     'lucy': 'friend',
//     'banana': 'enemy',
// }

// app.get('/friends', async (req, res) => {
//     const peopleRef = db.collection('people').doc('associates')
//     const doc = await peopleRef.get()
//     if (!doc.exists) {
//         return res.sendStatus(400)
//     }

//     res.status(200).send(doc.data())
// })

// app.get('/friends/:name', (req, res) => {
//     const { name } = req.params
//     if (!name || !(name in friends)) {
//         return res.sendStatus(404)
//     }
//     res.status(200).send({ [name]: friends[name] })
// })

// app.post('/addfriend', async (req, res) => {
//     const { name, status } = req.body
//     const peopleRef = db.collection('people').doc('associates')
//     const res2 = await peopleRef.set({
//         [name]: status
//     }, { merge: true })
//     // friends[name] = status
//     res.status(200).send(friends)
// })


app.post('/addData', async(req, res)=>{
    const { state, district, type, amount, quality } = req.body
    const stateRef = db.collection('Database').doc(state).collection(district).doc("new")
    const res3 = await stateRef.set({
        [d]:{
        "Time Stamp": d,
        "Type": type,
        "Amount": amount,
        "Quality": quality}
    }, { merge: true })
    res.status(200).send("Okay")
})

app.post('/bulkData', async(req, res)=>{
    const { state, district, type, amount, quality, lat, lon, annuHigh, annuLow, Time, ID } = req.body
    const stateRef = db.collection('Database').doc(state).collection(district).doc("Buffer")
    const res3 = await stateRef.set({
        [ID]:{[time]:{
        "Time Stamp": Time,
        "Type": type,
        "Amount": amount,
        "Quality": quality,
        "Latitude": lat,
        "Longitude": lon,
        "Annual High": annuHigh,
        "Annual Low": annuLow
    }}
    }, { merge: true })
    res.status(200).send("Okay")
})


app.get('/findDistrict', async (req, res) => {
    const { state, district } = req.body
    console.log(state);
    console.log(district);
    const districtRef = db.collection("Database").doc("Uttar Pradesh").collection("Lucknow").doc("new")
    const doc = await districtRef.get()
    var hello = doc.data();
    abc = Object.keys(hello);
    //const amounter = hello["Amount"];
    const element = []
    const amounttt = []
    for (let index = 0; index < abc.length; index++) {
        element[index] = abc[index].slice(4,7);
        amounttt[index] = hello[abc]["Amount"]
    }
    const output = [element, amounttt];
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    res.status(200).send(output)
})


app.get('/plotter', async (req, res) => {
    //const { state, district } = req.body
    const refff = db.collection("Database").doc("Uttar Pradesh").collection("Lucknow").doc("Buffer")
    const doc = await refff.get()
    var hello = doc.data();
    const arrayOfObject = Object.entries(hello).map((e)=> ({
        [e[0]]: e[1]
    }))
    //const namee = Object.keys(hello);
    //const amounter = hello["Amount"];
    //const namee = []
    // const output = []
    // const timerrr = []
    // const amounttt = []
    // const latitudee = []
    // const long = []
    // const annuLow = []
    // const annuHigh = []
    // const type = []
    // const quality = []
    // const nammee = []
    // for (let index = 0; index < namee.length; index++) {
    //     nammee[index] = Object.keys(hello[namee[index]]);
    //     amounttt[index] = hello[namee[0]][nammee][Amount]
    //     timerrr[index] = hello[namee[0]][nammee]["Time Stamp"]
    //     latitudee[index] = hello[namee[0]][nammee][Latitude]
    //     long[index] = hello[namee[0]][nammee][Longitude]
    //     annuLow[index] = hello[namee[0]][nammee]["Annual Low"]
    //     annuHigh[index] = hello[namee[0]][nammee]["Annual High"]
    //     type[index] = hello[namee[0]][nammee][Type]
    //     quality[index] = hello[namee[0]][nammee][Quality]
    //     // var nameee = Object.keys(namee[index]);
    //     //timerrr[index] = hello[namee][nameee]["Time Stamp"]
    // }
    // for (let indexing = 0; indexing < namee.length; indexing++) {
    //     //output[indexing] = [element[indexing], amounttt[indexing]]  
    //     output[indexing] = [nammee[indexing], amounttt[indexing], timerrr[indexing], latitudee[indexing], long[indexing], annuLow[indexing], annuHigh[indexing], type[indexing], quality[indexing]]
    // }
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    res.status(200).send(arrayOfObject)
})

// app.get('/friends', async (req, res) => {
//     const peopleRef = db.collection('people').doc('associates')
//     const doc = await peopleRef.get()
//     if (!doc.exists) {
//         return res.sendStatus(400)
//     }

//     res.status(200).send(doc.data())
// })


// app.get('/friends/:name', (req, res) => {
//     const { name } = req.params
//     if (!name || !(name in friends)) {
//         return res.sendStatus(404)
//     }
//     res.status(200).send({ [name]: friends[name] })
// })



app.patch('/changestatus', async (req, res) => {
    const { name, newStatus } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.set({
        [name]: newStatus
    }, { merge: true })
    // friends[name] = newStatus
    res.status(200).send(friends)
})

app.delete('/friends', async (req, res) => {
    const { name } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(friends)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))