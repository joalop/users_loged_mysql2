const exppres = require('express')
const { encrypt, compare } = require('../helpers/bcrypt')

const dotenv = require('dotenv')
dotenv.config()

const pool = require('../database/conMysql')

const router = exppres.Router()

let exist;
let rows;
let message;


// / GET
router.get('/', (req, res, next) => {
    res.redirect('/login')
})

// Login get
router.get('/login', (req, res, next) => {

    message = ''
    res.render('login', { message })
})

// Login post
router.post('/login', async (req, res, next) => {
    //console.log(req.body)
    
    const { email, password } = req.body
    let [ rows ] = await pool.query('select * from usuarios where email = ?', [ email])

    //console.log(rows)

    //check the passwords
    if( await compare(password, rows[0].passwd) ){
        //console.log('Contraseña correcta')
        //[ rows ] = await pool.query('select ')

        // Sessions
        let user = {
            
            name: req.session.name = rows[0].name,
            email: req.session.email = email,
            password: req.session.password = password,
        }

        res.render('logged', user)
    }else{
        message = 'Contraseña o email incorrecto'
        res.render('login', { message })
    }
})

// GET register
router.get('/register', (req, res, next) => {
    exist = ''
    res.render('register', { exist })
})

// POST register
router.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body
    //console.log(req.body)

    // Process to encrypted password
    const pass_encrypted = await encrypt(req.body.password)
    //console.log( pass_encrypted )
    let passwd = pass_encrypted
    // pass_encrypted.then((data) => { console.log(data)
    // }).catch( (err) => { console.log(err)
    // })
    // ________________________________

    // check if exist results in table mysql
        try{
            [ rows ] = await pool.query('select count(*) as "mail" from usuarios where email = ? ', [ email ])

            //rows.then( (data) => { console.lod(data) }).catch( ( error )=> { console.lod(error) } )
            //console.log(data)
        }catch{
        }
        //console.log(rows[0].mail,'rows value')

        if(rows[0].mail >= 1){ //Email exist
            exist = 'Email exist'
            res.render('register', {exist})

        }else{ // email not exist
            try{
                [ rows ] = await pool.query('INSERT INTO usuarios SET ?', [ { name, email, passwd } ])
                res.redirect('/login')
            }catch{
            }
        }
});

module.exports = router