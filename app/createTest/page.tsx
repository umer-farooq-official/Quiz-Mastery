"use client"
import FeaturesPane from "@/components/FeaturesPane";
import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
const jwt = require("jsonwebtoken")
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Page() {
  const [date, setDate] = React.useState<Date>();
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [decoded, setDecoded] = React.useState<DecodedToken | null>(null);

  const router = useRouter();   
  const secret = "dahdkjfhdskjfauio438723942uifuaydfsa87r923r2#@$%@%@";

  interface DecodedToken {
    userId: string;
  }

  useEffect(() => {
      const token = localStorage.getItem("token");

      if(!token){
          router.push("/signin");
          return;
      }

      if (token) {
          try{
              var decoded = jwt.verify(token, secret);

              console.log(decoded);
              if(decoded.userType === "Teacher"){
                setDecoded(decoded); 
              }
          }
          catch(err){
              console.error("Token verification failed:", err);
              localStorage.removeItem("token");
              router.push("/signin");
          }
      }
  }, []);



  const createTest = () =>{
    fetch("/api/createTest", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({name, code, date, startTime, endTime, userId: decoded!.userId }),
  })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          if(data.statusCode == 400){
              alert("Error!");
              return;
          }
          router.push("/dashboard");
      });



  }
  return (
    <>
      <div>
        <FeaturesPane />
      </div>
      <main className="flex flex-col items-center justify-between pt-2">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Create Test</CardTitle>
            <CardDescription>Make your new test in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input value={name} onChange={(e)=>{setName(e.target.value)}} id="name" placeholder="Name of your test" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="code">Unique Code</Label>
                  <Input value={code} onChange={(e)=> {setCode(e.target.value)}} id="code" placeholder="Code" />
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Test Date</Label>

                <Popover >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input value={startTime} onChange={(e) => {setStartTime(e.target.value)}} id="startTime" placeholder="02:00 PM" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input value={endTime} onChange={(e) => {setEndTime(e.target.value)}} id="endTime" placeholder="3:45 PM" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={createTest}>Create Test</Button>
          </CardFooter>
        </Card>
      </main>
    </>
  )
}


