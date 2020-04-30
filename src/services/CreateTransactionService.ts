import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const actualBalance = this.transactionsRepository.getBalance();

    let transaction: Transaction;
    if (type !== 'outcome' || actualBalance.total > value) {
      transaction = this.transactionsRepository.create(title, value, type);
    } else {
      throw Error('No sufficient founds for this transaction');
    }
    return transaction;
  }
}

export default CreateTransactionService;
