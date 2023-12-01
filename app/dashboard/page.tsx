
"use client";
// Import necessary components and hooks
import FeaturesPane from "@/components/FeaturesPane";
import { useState, useEffect } from "react";
// import { useContext } from "react";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
// import SidebarContext from "@/components/SidebarContext";

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

// Define the shape of the Test object
interface Test {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    code: string;
    date: string;
}

// Define the shape of the DecodedToken object
interface DecodedToken {
    userId: string;
    name: string;
    userType: string;
    email: string;
    iat: number;
    exp: number;
}

// The main component
export default function Page() {
    const [tests, setTests] = useState<Test[]>([]);
    const [token, setToken] = useState("");
    const router = useRouter();

    const secret = "dahdkjfhdskjfauio438723942uifuaydfsa87r923r2#@$%@%@";
    var userId = "";

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/signin");
            return;
        }
        else{
            setToken(token);
        }


        try {
            var decodedToken = jwt.verify(token, secret) as DecodedToken;

            if (decodedToken.userType === "Teacher") {
                userId = decodedToken.userId;
                getTests();
            }
        } catch (err) {
            console.error("Token verification failed:", err);
            localStorage.removeItem("token");
            router.push("/signin");
        }

    }, []);

    const getTests = async () => {
        const response = await fetch("/api/getTests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })

        if (response.ok) {
            const data = await response.json();
            setTests(data.tests as Test[]);
        } else {
            console.error("Failed to fetch tests");
        }
    };

    if(token != ""){
    return (
        <>
            <div>
                <FeaturesPane />
            </div>

            <main className="md:w-3/4 p-8 ml-80" >
                <div>
                    <Table className="flex min-h-screen flex-col items-left">
                        
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Test Name</TableHead>
                                <TableHead className="w-[100px]">Start Time</TableHead>
                                <TableHead className="w-[100px]">End Time</TableHead>
                                <TableHead className="w-[120px]">Unique Code</TableHead>
                                <TableHead className="w-[120px]">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        

                        {tests.length === 0 ? (
                            // Display a loading message or handle empty state
                            <TableRow>
                                <TableCell colSpan={6}>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            // Map over tests when there is data
                            tests.map((test) => (
                                <TableRow key={test.id}>
                                    <TableCell className="w-[100px]">{test.name}</TableCell>
                                    <TableCell className="w-[100px]">{test.startTime}</TableCell>
                                    <TableCell className="w-[100px]">{test.endTime}</TableCell>
                                    <TableCell className="w-[120px]">{test.code}</TableCell>
                                    <TableCell className="w-[120px]">{test.date}</TableCell>
                                </TableRow>
                            ))
                        )}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </>
    );
}
}