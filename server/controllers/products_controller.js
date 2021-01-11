
module.exports = {
    // create, getOne, getAll, update, and delete.
    create: (req, res) => {
        const db = req.app.get('db');
        const { name, description, price, image_url } = req.body;
        db.create_product([name, description, price, image_url])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send({ errMsg: "WHAT IS GOING ON!>!?!??" }))
    },
    update: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { description } = req.query;
        db.update_product({ id, description })
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    delete: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.delete_product({ id })
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getOne: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params;
        db.read_product({ id })
            .then(product => res.status(200).send(product))
            .catch(err => res.status(500).send(err))
    },
    getAll: (req, res) => {
        const db = req.app.get('db')
        db.read_products()
            .then(products => res.status(200).send(products))
            .catch(err => res.status(200).send(err))
    }
}