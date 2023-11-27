"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
const jwt = require('jsonwebtoken');
// import { config } from 'dotenv';
// config();

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const secret = "dahdkjfhdskjfauio438723942uifuaydfsa87r923r2#@$%@%@";

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            return;
        }

        if (token) {
            try{
                var decoded = jwt.verify(token, secret);

                console.log(decoded);
                if(decoded.userType === "Student"){
                }
                else if(decoded.userType === "Teacher"){
                    router.push("/dashboard");
                }
            }
            catch(err){
                console.error("Token verification failed:", err);
                localStorage.removeItem("token");
            }
        }
    }, []);




    const signin = () => {
        console.log(email, password);

        fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.statusCode == 400){
                    alert("Invalid Credentials");
                    return;
                }
                const token = data.token;
                localStorage.setItem("token", token);
                router.push("/dashboard");
            });
    };

    return (
        <div className={styles.mainContainer}>
            <Card style={{ width: "380px" }}>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    id="email"
                                    placeholder="Enter a valid email"
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    id="password"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="block">
                    <div className='flex items-center justify-center'>
                    <Button onClick={signin}>Sign In</Button></div>
                    <div className='flex items-center justify-center mt-5'>
                    <Label >Not have an account? <Link href="/signup">Sign Up</Link></Label>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
