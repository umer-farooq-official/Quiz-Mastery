// Desc: Route for signup
// /*File description:
// This file is the api for signing up a user
// This file is called from ../../../app/SignUp*/


import UserModel from '@/model/User';
import { sequelize } from '@/lib/database';


// This function is called when the user clicks on the submit button after filling the form in SignUp
export async function POST(req) {
    const {name, email, password, userType} = await req.json();
    console.log(name, email, password, userType);
   
    try{
        const User = UserModel(sequelize);

        User.create({
            name,
            email,
            password,
            userType
        });

        return Response.json({message: "User created successfully"});
    }
    catch(err){
        return Response.json({message: "Error creating user"});
    }
      
}