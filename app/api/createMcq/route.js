import McqModel from '@/model/Mcq';
import { sequelize } from '@/lib/database';

export async function POST(req) {
    const {question, option1, option2, option3, option4, correctOption, marks, testId } = await req.json();
    console.log(question, option1, option2, option3, option4, correctOption, marks, testId);

    try {

        const Mcqs = McqModel(sequelize);

        var variable = Mcqs.create({
            question,
            option1,
            option2,
            option3,
            option4,
            correctOption,
            marks,
            testId
        });
        console.log(variable);
        return Response.json({ message: "Mcq Added successfully" });
    }
    catch (err) {
        return Response.json({ message: "Error Adding Mcq" });
    }

}

