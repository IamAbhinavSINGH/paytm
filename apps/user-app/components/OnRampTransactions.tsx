import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {
            transactions.map(t => (
                <Transaction key={t.time.toISOString()} time={t.time} amount={t.amount} status={t.status}/>
            ))
            }
        </div>
    </Card>
}

function Transaction({time , amount , status} : {time : Date , amount : number , status : string} ){
    return (
        <div>
            <div className="flex justify-between mt-2">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {time.toDateString()}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {
                            (status === "Success") ?
                             <div className="text-green-600 font-medium"> {status} </div> 
                            : 
                            (status === "Failed") ?  
                                <div className="text-red-600">{ status }</div>
                            : <div> { status } </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {amount / 100}
                </div>

            </div>
        </div>
    );
}