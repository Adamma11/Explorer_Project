const authenticateToken = require('../shared/authenticate_token');
const authenticateCdeToken = require('../shared/authenticate_cde_token_new');

function getAllRoutes(app){
    app.use('/localreports/reports', authenticateToken, require('../routes/reports.routes'))	
}
module.exports = getAllRoutes;
