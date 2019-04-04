// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()


router.post('/register', (req, res) => {
   
    turbo.createUser(req.body)
    .then(data => {
        res.json({
            confirmation: 'success',
            data: data
        })
    })
    .catch(err => {
        res.json({
        confirmation: 'fail',
        message: err.message
        })
    })
})
    router.post('/login', (req, res) => {

        turbo.login(req.body)
        .then(data => {
            //successful login
            req.vertexSession.user = {id: data.id}

            res.json({
                confirmation: 'success',
                message: data
            })
        })
        .catch(err => {
            res.json({
            confirmation: 'fail',
            message: err.message
            })
        })
    })

    router.get('/currentuser', (req, res) => {
        if (req.vertexSession == null) {
            res.json({
                confirmation: 'success',
                user: null
            })
            return
        }
        if (req.vertexSession.user == null){
            res.json({
                confirmation: 'success',
                user: null
            })
            return
        }
        res.json({
            confirmation: 'success',
            user: req.vertexSession.user
        })
    })

module.exports = router
