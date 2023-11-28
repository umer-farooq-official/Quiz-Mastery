// Desc: Get all tests for a user
// /*File description:
// This file is the api for getting all the tests for a particular user
// This file is called from ../../../app/Tests/



import TestModel from '@/model/Test';
import { sequelize } from '@/lib/database';


// This function is called when the user clicks on the submit button after filling the form in CreateMcq
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