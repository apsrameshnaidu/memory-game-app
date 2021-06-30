const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'root',
    port: 5432,
})

// const pool = new Pool({
//     user: '<user_id>',
//     host: '<host>',
//     database: '<databse>',
//     password: '<password>',
//     port: '<port>',
// })


const getAllCards = (request, response) => {
    pool.query('SELECT * FROM cards', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCardsByLevel = (request, response) => {
    const level = request.params.level;
    let limit;
    switch (level) {
        case 'easy':
            limit = 5;
            break;
        case 'medium':
            limit = 10;
            break;
        case 'hard':
            limit = 25;
            break;
    }

    pool.query('SELECT * FROM cards LIMIT $1', [limit], (error, results) => {
        if (error) {
            response.status(500).json('Some thing went wrong.')
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCardsByLevel,
    getAllCards
}