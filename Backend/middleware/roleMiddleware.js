const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
     
      if (!req.user || !req.user.role) {
        throw new Error('User role not found in request');
      }

      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
      }


      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = roleMiddleware;
