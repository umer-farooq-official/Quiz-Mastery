/*File Description: 
This file is the api for creating a new test and adding it to the database
This file is called from ../../../app/CreateTest*/

import TestModel from '@/model/Test';
import { sequelize } from '@/lib/database';

// This function is called when the user clicks on the submit button after filling the form in CreateTest
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

