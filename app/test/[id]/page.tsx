"use client"
import FeaturesPane from "@/components/FeaturesPane";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import Link from "next/link";
import { Button } from "@/components/ui/button";


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Mcqs {
    id: string;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: string;
    marks: number;
}

interface DecodedToken {
    userId: string;
    name: string;
    userType: string;
    email: string;
    iat: number;
    exp: number;
}


const secret = "dahdkjfhdskjfauio438723942uifuaydfsa87r923r2#@$%@%@";


export default function Page({ params }: { params: { id: string } }) {
    const [mcqs, setMcqs] = useState<Mcqs[]>([]);
    // const [decoded, setDecoded] = useState<DecodedToken | null>(null);
    const router = useRouter();

   
    
      useEffect(() => {
          const token = localStorage.getItem("token");
    
          if(!token){
              router.push("/signin");
              return;
          }
    
          if (token) {
              try{
                  var decoded = jwt.verify(token, secret) as DecodedToken;
    
                  console.log(decoded);
                  if(decoded.userType === "Teacher"){
                    // setDecoded(decoded); 
                    getMcqs();
                  }
              }
              catch(err){
                  console.error("Token verification failed:", err);
                  localStorage.removeItem("token");
                  router.push("/signin");
              }
          }
      }, []);
    
    
    
      const getMcqs = () =>{
        fetch("/api/getMcqs", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({testId: params.id }),
      })
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              setMcqs(data.mcqs as Mcqs[]);
              
          });
    
    
    
      }

    

    return (
        <>
            <div>
                <FeaturesPane />
            </div>
            <main className="md:w-3/4 p-8 ml-80" >
                <div>
                <Button >
                <Link href={`/createMcq/${params.id}`}>
                    Create Mcqs
                    </Link></Button>
                <Table className="flex min-h-screen flex-col items-left">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px]">Question</TableHead>
                                    <TableHead className="w-[120px]">Option1</TableHead>
                                    <TableHead className="w-[120px]">Option2</TableHead>
                                    <TableHead className="w-[120px]">Option3</TableHead>
                                    <TableHead className="w-[120px]">Option4</TableHead>
                                    <TableHead className="w-[120px]">Correct Option</TableHead>
                                    <TableHead className="w-[120px]">Marks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mcqs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>Loading...</TableCell>
                                    </TableRow>
                                ) : (
                                    mcqs.map((mcq) => (
                                        
                                        <TableRow key={mcq.id}>
                                            <TableCell className="w-[150px]">{mcq.question}</TableCell>
                                            <TableCell className="w-[120px]">{mcq.option1}</TableCell>
                                            <TableCell className="w-[120px]">{mcq.option2}</TableCell>
                                            <TableCell className="w-[120px]">{mcq.option3}</TableCell>
                                            <TableCell className="w-[120px]">{mcq.option4}</TableCell>
                                            <TableCell className="w-[120px]">{mcq.correctOption}</TableCell>
                                            <TableCell className="w-[120px]">{mcq.marks}</TableCell>
                                        </TableRow>
                                        
                                    ))
                                )}
                            </TableBody>
                        </Table>
                </div>
            </main>
        </>
    )
}