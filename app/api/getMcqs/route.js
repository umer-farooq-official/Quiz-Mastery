import McqsModel from '@/model/Mcqs';
import { sequelize } from '@/lib/database';

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