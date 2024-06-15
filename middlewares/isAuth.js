const authenticate = (req, res, next) => {
    const { isAuth, userId } = req.cookies;
    if (isAuth !== 'true' || !userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    req.userId = userId; // Передаем userId в запрос
    next();
  };
  
  export default authenticate;
  