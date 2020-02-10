const router = require('express').Router();
const innovations = require('../controllers/innovations');

router.get('/', innovations.getInnovations);
router.get('/new', innovations.createInnovations);
router.post('/', innovations.postInnovations);
router.post('/search', innovations.searchInnovations);
router.get('/single', (req, res, next) => res.render('singleInnovations'));

module.exports = router;
