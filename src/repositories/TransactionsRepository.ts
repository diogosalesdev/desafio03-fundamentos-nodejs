import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // DONE
    return this.transactions;
  }

  public getBalance(): Balance {
    // DONE
    const income = this.transactions.reduce((previous, current) => {
      if (current.type === 'income') {
        return previous + current.value;
      }
      return previous;
    },0);

    const outcome = this.transactions.reduce((previous, current) => {
      if (current.type === 'outcome') {
        return previous + current.value;
      }
      return previous;
    },0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total
    }
  }

  public create({ title, value, type }: Request): Transaction {
    // DONE
    const { total } = this.getBalance();

    if (total < value && type === 'outcome') {
      throw Error('Insufficient funds!');
    }

    const transaction = {
      id: uuid(),
      title,
      value,
      type
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
