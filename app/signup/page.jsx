"use client";
import React, { useState } from 'react';
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Link from "next/link"



export default function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("student");

    const handleUserTypeChange = (e) => {
        setUserType(e);
    };

    const signup = () => {
        console.log(name, email, password, userType);

        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, userType: userType }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <div className={styles.mainContainer}>
            <Card style={{ width: "380px" }}>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Enter your credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    id="name"
                                    placeholder="Enter name"
                                />
                            </div>
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

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="dropdown">Select User Type</Label>
                                <Select id="dropdown" value={userType} onValueChange={handleUserTypeChange}>
                                    <SelectTrigger >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="student">Student</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="block">
                    <div className='flex items-center justify-center'>
                    <Button onClick={signup}>Signup</Button></div>
                    <div className='flex items-center justify-center mt-5'>
                    <Label >Already have an account? <Link href="/signin">Sign In</Link></Label>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
