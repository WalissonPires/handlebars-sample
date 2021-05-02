const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.static('public'));

//app.engine('handlebars', exphbs());
const hbs = exphbs.create({
    helpers: {
        section: function(name, options) {
          if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
          }
      }
});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');


app.get('/', handleHome);
app.get('/done', handleDone);


app.listen(5005, () => console.log('listing in port 5005'));



// ==== requests handles =====
function handleHome(req, res) {

    const products = getProducts();

    res.render('home', {
        data: {
            products
        }
    });
}

function handleDone(req, res) {

    res.render('done');
}


// ========= data =========
function getProducts() {

    // get from db
    return [{
        name: 'Product 1',
        price: 500.10,
        hasStock: true
    }, {
        name: 'Product 2',
        price: 1500,
        hasStock: true
    }, {
        name: 'Product 3',
        price: 6010,
        hasStock: false
    }]
}