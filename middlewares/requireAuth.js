import  Jwt  from "jsonwebtoken";
import User from "../models/User.js";


export const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            error: 'You must logged in',
        });
    }

    const token = authorization.replace('Bearer', '');

    Jwt.verify(token, process.env.Jwt_SECRET, async (err, playload) => {
        if (err) {
            return res.status(401).json({
                success: false,
                error: 'You must be logged in',
            });
        }

        const { id } = playload;

        const user = await User.findById(id);
        req.user = user;
        next();
    });
}

