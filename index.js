// index.js

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/SuperMarkets', { useNewUrlParser: true })
mongoose.set('debug', true)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const shopsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})


const productsSchema = new mongoose.Schema(
  {
    market_id: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }
)


var shops = mongoose.model('shops', shopsSchema);
var products = mongoose.model('products', productsSchema);


const express = require("express");
const path = require("path");


const app = express();
const port = process.env.PORT || "8000";



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});


app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "Xentoulis" } });
});

app.get("/list", (req, res) => {
  res.render("list", { title: "List" });
});

app.get("/logout", (req, res) => {
  res.render("logout", { title: "Logout", userProfile: { nickname: "Xentoulis" } });
});

app.get("/products", (req, res) => {
  
  products.find({}, 'name', function (err, data) {

    if (err) res.send(err);
    res.send({'products': data});
  })
});

app.get("/products/:id", (req, res) => {
  
  products.find({_id: req.params.id}, 'name', function (err, data) {

    if (err) res.send(err);
    res.send({'product': data});
  })
});

app.get("/shops", (req, res) => {

  shops.find({}, 'name', function (err, data) {

    if (err) res.send(err);
    res.send({'shops': data});
  })
  
});

app.get("/shops/:id", (req, res) => {

  shops.find({_id: req.params.id}, 'name', function (err, data) {

    if (err) res.send(err);
    res.send({'shop': data});
  })
});





app.post("/products/:id", (req, res) => {
  // divazw apo tin vasi to product
  res.send({'test': 'test'});
});

app.post("/shop/:id", (req, res) => {
  // divazw apo tin vasi to shop
  res.render("logout", { title: "Logout", userProfile: { nickname: "Xentoulis" } });
});




app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
