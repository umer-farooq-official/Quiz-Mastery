// Desc: Sign-in route
// /*File description:
// This file is the api for signing in a user
// This file is called from ../../../app/SignIn*/



import UserModel from '@/model/User';
import { sequelize } from '@/lib/database';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();



// This function is called when the user clicks on the submit button after filling the form in SignIn
export async function POST(req) {
    const { email, password } = await req.json();
    console.log(email, password);

    try {
        const User = UserModel(sequelize);

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user && user.password === password) {
            const secretKey = process.env.JWT_SECRET;
            console.log('Secret Key:', secretKey); 

            const payload = {
                userId: user.id,
                name: user.name,
                email: user.email,
                userType: user.userType
            };

            const token = jwt.sign(payload, secretKey, { expiresIn: '8h' });

            console.log('Generated Token:', token);

            return Response.json({ message: "Sign-in successful", token: token});
        } else {
            return Response.json({ message: "Invalid email or password", statusCode: 400 });
        }
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Error during sign-in", statusCode: 400 });
    }
}
