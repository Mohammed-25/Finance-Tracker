interface Transaction {
  source: string;
  value: number;
  date: Date;
}

class FinanceTracker {
  private incomes: Transaction[] = [];
  private expenses: Transaction[] = [];
  private savingTarget: number = 0;
  private savingAmount: number = 0;

  addIncome(source: string, value: number, date: Date) {
    this.incomes.push({ source, value, date });
    this.updateOutput();
  }

  addExpense(source: string, value: number, date: Date) {
    this.expenses.push({ source, value, date });
    this.updateOutput();
  }

  setSavingTarget(target: number, amount: number) {
    this.savingTarget = target;
    this.savingAmount = amount;
    this.updateOutput();
  }

  private updateOutput() {
    const outputDiv = document.getElementById("output");
    if (outputDiv) {
      outputDiv.innerHTML = `
                <h3>Incomes</h3>
                ${this.incomes
                  .map(
                    (income) =>
                      `<p>${income.source}: $${
                        income.value
                      } on ${income.date.toLocaleDateString()}</p>`
                  )
                  .join("")}
                <h3>Expenses</h3>
                ${this.expenses
                  .map(
                    (expense) =>
                      `<p>${expense.source}: $${
                        expense.value
                      } on ${expense.date.toLocaleDateString()}</p>`
                  )
                  .join("")}
                <h3>Saving Target</h3>
                <p>Target: $${this.savingTarget}, Amount Saved: $${
        this.savingAmount
      }</p>
            `;
    }
  }
}
const financeTracker = new FinanceTracker();

document.getElementById("addIncome")?.addEventListener("click", () => {
  const source = (document.getElementById("incomeSource") as HTMLInputElement)
    .value;
  const value = parseFloat(
    (document.getElementById("incomeValue") as HTMLInputElement).value
  );
  const date = new Date(
    (document.getElementById("incomeDate") as HTMLInputElement).value
  );
  financeTracker.addIncome(source, value, date);
});

document.getElementById("addExpense")?.addEventListener("click", () => {
  const source = (document.getElementById("expenseSource") as HTMLInputElement)
    .value;
  const value = parseFloat(
    (document.getElementById("expenseValue") as HTMLInputElement).value
  );
  const date = new Date(
    (document.getElementById("expenseDate") as HTMLInputElement).value
  );
  financeTracker.addExpense(source, value, date);
});

document.getElementById("setSaving")?.addEventListener("click", () => {
  const target = parseFloat(
    (document.getElementById("savingTarget") as HTMLInputElement).value
  );
  const amount = parseFloat(
    (document.getElementById("savingAmount") as HTMLInputElement).value
  );
  financeTracker.setSavingTarget(target, amount);
});
