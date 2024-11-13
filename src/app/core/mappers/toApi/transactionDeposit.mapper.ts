import { ITransactionDeposit } from "../../interfaces/requestApiTo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transactionDepositMapper = (transaction: any): ITransactionDeposit => {

    const props = ["id", "amount", "date", "description"];

    if (props.some(prop => !transaction[prop])) {
        throw new Error("Transaction is missing some properties")
    }

    return { ...transaction }

}