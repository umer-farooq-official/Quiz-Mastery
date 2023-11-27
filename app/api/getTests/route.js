import TestModel from '@/model/Test';
import { sequelize } from '@/lib/database';

export async function POST(req) {
    const {userId} = await req.json();
    console.log(userId);
      
}