import UserModel from '@/model/User';
import { sequelize } from '@/lib/database';

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