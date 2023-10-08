const express = require('express');
const bodyParser = require('body-parser');
const paymentRouter = require('./routes/paymentRouter');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("Home page");
});

app.use('/payment', paymentRouter);

const port = 5000;

async function main() {
    try {
        // await DB connection

        return app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

main();

