const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mg = require('mongoose');
const schema = require('./schema/usuarios')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('pages', path.join(__dirname, 'pages'));

mg.set('strictQuery', true);
mg.connect("mongodb+srv://newUser123:newUser123@cluster0.mpxhhxs.mongodb.net/?retryWrites=true&w=majority")

app.get('/', (req, res) => {
  res.render('pages/home/home.ejs');
})

app.get('/login', (req, res) => {
  res.render('pages/login/login.ejs')
})

app.get('/signup', (req, res) => {
  res.render('pages/signup/signup.ejs')
})

async function searchName(username){
 let usernameDb = schema.findOne({ username: username })
 return usernameDb
}

function searchEmail(email){
  let emailDb = schema.findOne({ email: email })
  return emailDb
}

app.post('/signup', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  let usernameDb = await searchName(username)
  let emailDb = await searchEmail(email)

  if(usernameDb == null){
    if(emailDb == null){
      schema.insertMany({ username: username, password: password, email: email })
      res.send("Conta criada com sucesso")
    }else{
      res.send("Este email já esta sendo utilizado")
    }
  }else{
    res.send("Este username já esta sendo utilizado")
  }

})

async function login(username){
  let usernameDb = await schema.findOne({username: username})
  return usernameDb
}

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const account = await login(username);

  if(account == null){
    res.send('Conta nao encontrada')
  }else{
    if(account.password != password){
      res.send("Senha errada")
    }else{
      res.send("login efetuado com sucesso")
    }
  }
  

})

const port = 8080;

app.listen(port, () => {
  console.log("Servidor rodando na porta: " + port)
})