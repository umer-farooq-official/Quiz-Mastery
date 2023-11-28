// Purpose: To get all the mcqs for a particular test
// /*File description:
// This file is the api for creating a new mcq and adding it to the database
// This file is called from ../../../app/CreateMcq*/


import McqsModel from '@/model/Mcqs';
import { sequelize } from '@/lib/database';

// This function is called when the user clicks on the submit button after filling the form in CreateMcq
export async function POST(req) {
    const {testId} = await req.json();
    console.log(testId);
   
    try{
        const Mcqs = McqsModel(sequelize);

        const mcqs = await Mcqs.findAll({
            where: {
                testId: testId
            }
        });
        console.log(mcqs);
        return Response.json({mcqs});
    }
    catch(err){
        return Response.json({message: "Error fetching Mcqs"});
    }
}