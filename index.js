const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb')
const { query } = require('express')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// const uri = "mongodb://localhost:27017"

// Mongodb Connection
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.hlyc9ph.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const catagoryCollections = client.db('Team-Work').collection('category')
    const userCollections = client.db('Team-Work').collection('users')

    app.get('/catagorys', async (req, res) => {
      const query = {}
      const result = await catagoryCollections.find(query).toArray()
      res.send(result)
    })

    app.post('/users', async (req, res) => {
      const user = req.body
      const result = await userCollections.insertOne(user)
      res.send(result)
    })

    app.get('/alluser', async (req,res)=>{
      const query ={}
      const result = await userCollections.find(query).toArray()
      res.send(result)
    })

  } finally {
    
  }
}

run().catch((er) => console.log(er))

app.get('/', (req, res) => {
  res.send('Backend is running now')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
