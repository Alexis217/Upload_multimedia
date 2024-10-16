import jwt from 'jsonwebtoken';

// Middleware para manejar errores
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor',
    });
};

// Middleware para autenticar el token
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Acceso denegado: ningun token fue proporcionado' });

    jwt.verify(token, 'your_secret', (err, user) => {
        if (err) return res.status(403).json({ message: 'token invalido' });
        req.user = user; 
        next(); 
    });
};
