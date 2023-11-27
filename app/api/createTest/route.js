import TestModel from '@/model/Test';
import { sequelize } from '@/lib/database';

export async function POST(req) {
    const {userId, name, startTime, endTime, code, date} = await req.json();
    console.log(userId, name, startTime, endTime, code, date);
   
    try{
        const Test = TestModel(sequelize);

        Test.create({
            name,
            startTime,
            endTime,
            code,
            userId,
            date
        });

        return Response.json({message: "Test created successfully"});
    }
    catch(err){
        return Response.json({message: "Error creating Test"});
    }
      
}