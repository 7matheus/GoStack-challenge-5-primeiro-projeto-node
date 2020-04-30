import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    let incomes = 0;
    let outcomes = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomes += transaction.value;
      } else {
        outcomes += transaction.value;
      }
    });

    const total = incomes - outcomes;

    const balance: Balance = {
      income: incomes,
      outcome: outcomes,
      total,
    };

    return balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
