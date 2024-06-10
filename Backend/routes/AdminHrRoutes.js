const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const employeeController = require('../controllers/employeeController');
const { protectRoute } = require('../middleware/authMiddleware');




//Hr Routes

router.post('/addemployees', protectRoute, roleMiddleware(['HR']), employeeController.addEmployee);
router.get('/employees', protectRoute, roleMiddleware(['HR']), employeeController.getPendingEmployees);


router.get('/employees/pending', protectRoute, roleMiddleware(['Admin']), employeeController.getPendingEmployees);
router.put('/employees/:employeeId/approve', protectRoute, roleMiddleware(['Admin']), employeeController.approveEmployee);
router.put('/employees/:employeeId/reject', protectRoute, roleMiddleware(['Admin']), employeeController.rejectEmployee);

module.exports = router;