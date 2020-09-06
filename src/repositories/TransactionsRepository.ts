import Transaction from '../models/Transaction';
import { response } from 'express';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((somador: Balance, transaction: Transaction) => {
      switch(transaction.type){
        case "income":
          somador.income += transaction.value;
          break;
        case "outcome":
          somador.outcome += transaction.value;
          break;
        default:
          break;
      }

      return somador;

    }, {
      income: 0,
      outcome: 0,
      total: 0,

    })

    balance.total = balance.income - balance.outcome

    return balance;


  }

  public create({title, value, type}: createTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type})

    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
