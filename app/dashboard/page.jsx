"use client";
import * as React from "react";
import { useState } from "react";


export default function Dashboard() {
    const Test = ({ onAddTest }) => {
        const [name, setName] = useState('');

        const handleAddTest = () => {
            const newTest = new Test(Date.now(), name);
            onAddTest(newTest);
            setName('');
        };
        const TestList = ({ tests }) => {
            return (
                <div>
                    <h2>Test List</h2>
                    <ul>
                        {tests.map((Test) => (
                            <li key={Test.id}>
                                {Test.name} - {Test.questions.length} questions
                            </li>
                        ))}
                    </ul>
                </div>
            );
        };
        const dashboard = () => {
            console.log(name);

            fetch("/api/dashboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
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
            <div>
                <h2>Add Test</h2>
                <label htmlFor="name">Test Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleAddTest}>Add Test</button>
            </div>
        );
    }
};  