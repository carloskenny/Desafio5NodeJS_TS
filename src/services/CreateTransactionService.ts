import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type}: Request ): Transaction {
    if(!["income","outcome"].includes(type)){
      throw new Error("Tipo de transação inválida, tente novamente!");

    }

    const saldo = this.transactionsRepository.getBalance().total;

    if(type === "outcome" && saldo < value) {
      throw new Error("Você não possui saldo suficiente!");
    }

    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
