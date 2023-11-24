"use client";
import * as React from "react";
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

export default function mcq() {
    const [question, setQuestion] = React.useState("");
    const [option1, setOption1] = React.useState("");
    const [option2, setOption2] = React.useState("");
    const [option3, setOption3] = React.useState("");
    const [option4, setOption4] = React.useState("");
    const [correctoption, setCorrectOption] = React.useState("");

    const mcq = () => {
        console.log(question, option1, option2, option3, option4);

        fetch("/api/mcq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, option1, option2, option3, option4, correctoption }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    window.location.href = "/login";
                }
            });
    };

    return (
        <div className={styles.mainContainer}>
            <Card style={{ width: "380px" }}>
                <CardHeader>
                    <CardTitle>Question 1</CardTitle>
                    <Input
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                        }}
                    />
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="option1">Option1</Label>
                                <Input
                                    value={option1}
                                    onChange={(e) => {
                                        setOption1(e.target.value);
                                    }}
                                    id="option1"
                                    placeholder="Enter a option"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="option2">Option2</Label>
                                <Input
                                    value={option2}
                                    onChange={(e) => {
                                        setOption2(e.target.value);
                                    }}
                                    id="option2"
                                    placeholder="Enter a option"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="option3">Option3</Label>
                                <Input
                                    value={option3}
                                    onChange={(e) => {
                                        setOption3(e.target.value);
                                    }}
                                    id="option3"
                                    placeholder="Enter a option"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="option4">Option4</Label>
                                <Input
                                    value={option4}
                                    onChange={(e) => {
                                        setOption4(e.target.value);
                                    }}
                                    id="option4"
                                    placeholder="Enter a option"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="correctoption">Correct Option</Label>
                                <Input
                                    value={correctoption}
                                    onChange={(e) => {
                                        setCorrectOption(e.target.value);
                                    }}
                                    id="correctoption"
                                    placeholder="Enter te correct option"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={mcq}>Add Question</Button>
                </CardFooter>
            </Card>
        </div>
    );
}      