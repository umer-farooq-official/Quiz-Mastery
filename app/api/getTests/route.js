import TestModel from '@/model/Test';
import { sequelize } from '@/lib/database';

export async function POST(req) {
    const {userId} = await req.json();
    console.log(userId);
   
    try{
        const Test = TestModel(sequelize);

        const tests = await Test.findAll({
            where: {
                userId: userId
            }
        });
        console.log(tests);
        return Response.json({tests});
    }
    catch(err){
        return Response.json({message: "Error fetching Tests"});
    }
}