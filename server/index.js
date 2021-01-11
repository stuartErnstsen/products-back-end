require('dotenv').config()

const
    express = require('express'),
    massive = require('massive'),
    prodCtrl = require('./controllers/products_controller'),
    { SERVER_PORT, CONNECTION_STRING } = process.env,
    app = express();

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('DB connected!')
})

app.use(express.json());

app.get(`/api/products`, prodCtrl.getAll)
app.get(`/api/products/:id`, prodCtrl.getOne)
app.post(`/api/products`, prodCtrl.create)
app.put(`/api/products/:id`, prodCtrl.update)
app.delete(`/api/products/:id`, prodCtrl.delete)

app.listen(SERVER_PORT, () => console.log(`App listening on port: ${SERVER_PORT}`))