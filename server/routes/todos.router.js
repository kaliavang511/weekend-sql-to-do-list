const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos";`
    pool.query(queryText)
        .then((result) => {
            console.log("Result from DB:", result.rows)
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error making query.. '${queryText}'`, err)
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    let toDos = req.body
    
    let toDosArray = [toDos.text]
    let queryText = `
        INSERT INTO "todos" ("text")
        VALUES ($1);
    `
    pool.query(queryText, toDosArray)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
});



router.delete('/:id', (req, res) => {
    let queryText = `
        DELETE FROM "todos"  WHERE "id" = $1;
    `
    let reqId = [req.params.id]
    pool.query(queryText, reqId)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
});


router.put('/complete/:id', (req, res) => {
    let completeId = req.params.id
    let completed = req.body.completed

    let queryText = ''

    if (completed === 'false'){
        queryText = `
            UPDATE "todos" SET "isComplete"=TRUE
            WHERE "id"= $1;
        `
    } else {
        res.sendStatus(500)
    }

    pool.query(queryText, [completeId])
        .then((result) => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.log(`Error making query.. '${queryText}'`, err)
            res.sendStatus(500)
        })
})





module.exports = router;
