const routes = require('./controllers/')

//connecting home routes
const homeRoutes = require('./controllers/home-routes');
router.use('/', homeRoutes);