"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [response , setResponse] = useState("");

    const clearResponse = () => {
        setResponse("");
    }

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send Money">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                        clearResponse();
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                        clearResponse();
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            clearResponse();
                            const result = await p2pTransfer(number, Number(amount) * 100)
                            setResponse(result.message);
                        }}>Send</Button>
                    </div>

                    <div className="pt-4 flex justify-center text-stone-700">
                        {response}
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}