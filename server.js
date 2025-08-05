const PORT = 8000
const express = require('express')
const app = express()
const uuid4 = require('uuid4')
const cors = require('cors')
app.use(cors())
app.use(express.json())

const sdk = require('node-appwrite')

const client = new sdk.Client()
       .setEndpoint('https://nyc.cloud.appwrite.io/v1') // API endpoint
       .setProject('6889c2850007c46f44b1')  // Project ID
       .setKey('standard_488b9d4d44682a75690599f3a651e0e9e1ecbb9594f2245010dbcdbd23191c87fb1d232df3de4792cd8b7ca631bfbe504ae2b8fd5f7ae5afcfb7a7b19e08253146e6711436af596acb2720353e6d1427e2ead5245a223791daedf4f97a1a3dc82e6c8fc8adad47efbc54a119a7d092a9924f9442eb4c91c82acc7e85cc5b2325') // secret API key

const messaging = new sdk.Messaging(client)
const users = new sdk.Users(client)

app.post('/register', async (req, res) => {
    try{
        const user = req.body
        const id = uuid4()

        const result = await users.create(
            id,
            user.email,
            user.tel
        )
        console.log(result)

        if (result) {
            sendEmail(result)
            sendSMS(result)
        }

    }catch(error){
        console.error(error)
    }
})

const  sendEmail = async (result) => {
    const id = uuid4()
    const email = result.email
    const userId = result['$id']

    const msgge = await messaging.createEmail(
                        id, //mssgeID
        `Welcome! ${email}`,//subject
        'hi', // content
       [], //topics (optional)
       [userId] // users
   )
    console.log(msgge)
}

const sendSMS = async (result) => {
    const id = uuid4()
    const userId = result['$id']

    const message1= await messaging.createSms(
                              id, //mssgeID
          'SMS test, welcome!', // content
           [], //topics (optional)
           [userId] // users
    )
   console.log(message1)
}

app.listen(PORT, () => console.log(`SERVER Listening on port ${PORT}`))