
const restify = require('restify')
const builder = require('botbuilder')

// Setup Restify Server
const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url)
})

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
  appId: process.env.APP_ID,
  appPassword: process.env.APP_SECRET
})

// Listen for messages from users
server.post('/api/messages', connector.listen())

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
const bot = new builder.UniversalBot(connector, session => {
  session.beginDialog('selectLanguange')
})

bot.dialog('bigfive', () => [
  function (session) {
    session.beginDialog('selectLanguange')
  }
])

bot.dialog('selectLanguange', [
  function (session) {
    builder.Prompts.text(session, 'Please select language')
  },
  function (session, results) {
    session.endDialogWithResult(results)
  }
])
