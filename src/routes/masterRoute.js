const route = require('express').Router();

// import all routes
const userRoute = require('./userRoute');
const forgetRoute = require('./forgetRoute');
// const adminRoute = require('./routes/adminRoute');
const allUserRoute = require('./alluserRoute');
const pagenotfoundRoute = require('./notfoundRoute');
const mainRoutes = require('./mainRoute');
const dashboardRoutes = require('./dashboardRoute');
const userDashboardRoute = require('./userDashboardRoute');


// use all routes
route.use(mainRoutes);
route.use(userRoute);
route.use(dashboardRoutes);
route.use(userDashboardRoute);
route.use(forgetRoute);
route.use('/alluser', allUserRoute);
route.use(pagenotfoundRoute);


module.exports = route;