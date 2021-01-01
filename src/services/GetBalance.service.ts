import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class GetBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  execute(transactions: Transactions[]): Balance {
    function count(transecs: Transactions[], type: string): number[] {
      const val: number[] = [];

      transecs.forEach(t => {
        if (t.type === type) val.push(t.value);
      });

      return val;
    }

    const val1 = count(transactions, 'income');
    const val2 = count(transactions, 'outcome');

    const balance = this.transactionsRepository.getBalance(val1, val2);

    return balance;
  }
}

export default GetBalanceService;
