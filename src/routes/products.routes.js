import { Router } from 'express';
import { upload } from '../settings/upload.config.js';
import { authenticateToken } from '../middlewares/errors.middleware.js';

let idCounter = 1;

const ProductsRouter = Router();

// POST /products?storage=cloudinary para subir imagenes a Cloudinary
// POST /products para subir imagenes locales
ProductsRouter.post('/', authenticateToken, (req, res, next) => {
    const useCloudinary = req.query.storage === "cloudinary";
    const uploadMiddleware = upload(useCloudinary).single("image");

    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { name, description, price } = req.body;

        if (!name || !description || !price || !req.file) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Si es Cloudinary, devuelve la URL de Cloudinary; si es local, devuelve la ruta local
        const imageUrl = useCloudinary ? req.file.path : `/uploads/${req.file.filename}`;

        res.status(201).json({
            message: "Producto creado correctamente",
            id: idCounter++,
            name,
            description,
            price,
            imageUrl
        });
    });
});

export { ProductsRouter };