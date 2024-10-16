import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import crypto from "node:crypto";
import path from "node:path";

// Configurarión de Cloudinary
cloudinary.v2.config({
    cloud_name: "di0uujlqw",
    api_key: "859885883169547",
    api_secret: "FGhMM8gObOGZbuvbJ5v0V6lDhjw"
});

// Configuración de Cloudinary Storage
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads',
        format: async (req, file) => {
            const supportedFormats = ['jpeg', 'jpg', 'png', 'gif', 'webp']; // Lista de formatos permitidos
            const fileExtension = path.extname(file.originalname).toLowerCase().replace('.', '');

            // Verifica si el formato es compatible
            if (supportedFormats.includes(fileExtension)) {
                return fileExtension; // Devuelve el formato original
            } else {
                throw new Error('Formato no permitido');
            }
        },
        public_id: (req, file) => crypto.randomUUID().toString(),
    },
});

// Configuración de almacenamiento local
const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (_req, file, cb) => {
        const fileName = crypto.randomUUID().toString() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

// Limites
const maxMb = 20;
const limits = { fileSize: 1024 * 1024 * maxMb };

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const allowExtname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (!allowExtname) {
        return cb(new Error("solo se aceptan imágenes (jpeg, jpg, png, gif, webp)"));
    }

    return cb(null, true);
};

// Función para elegir almacenamiento (local o Cloudinary)
export const upload = (useCloudinary) => {
    const storage = useCloudinary ? cloudinaryStorage : localStorage;
    return multer({ storage, fileFilter, limits });
};
