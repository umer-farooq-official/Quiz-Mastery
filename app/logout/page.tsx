
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/signin");
            return;
        }
        else{
            localStorage.removeItem("token");
            router.push("/signin");
        }

    }, []);
}