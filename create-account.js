function createAccount (pin, amount) {
	let accountBalance = amount || 0;
	let accountPin = pin;

	return {
		checkBalance (enteredPin) {
			if (enteredPin === accountPin) {
				return `$${accountBalance}`;
			}
			else {
				return 'Invalid PIN.';
			}
		},
		deposit (enteredPin, depositAmount) {
			if (enteredPin === accountPin) {
				if (typeof depositAmount !== 'number' || depositAmount <= 0) {
					return 'Invalid deposit amount.';
				}
				accountBalance += depositAmount;
				return `Successfully deposited $${depositAmount}. Current balance: $${accountBalance}.`;
			}
			else {
				return 'Invalid PIN.';
			}
		},
		withdraw (enteredPin, withdrawalAmount) {
			if (enteredPin === accountPin) {
				if (typeof withdrawalAmount !== 'number' || withdrawalAmount <= 0) {
					return 'Invalid withdrawal amount.';
				}
				if (withdrawalAmount > accountBalance) {
					return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
				}
				else {
					accountBalance -= withdrawalAmount;
					return `Successfully withdrew $${withdrawalAmount}. Current balance: $${accountBalance}.`;
				}
			}
			else {
				return 'Invalid PIN.';
			}
		},
		changePin (oldPin, newPin) {
			if (oldPin === accountPin) {
				accountPin = newPin;
				return 'PIN successfully changed!';
			}
			else {
				return 'Invalid PIN.';
			}
		}
	};
}

module.exports = { createAccount };

// Example

let account = createAccount('1234', 100);

account.checkBalance('oops');
// "Invalid PIN."

account.deposit('1234', 250);
// "Successfully deposited $250. Current balance: $350."

account.withdraw('1234', 300);
// "Successfully withdrew $300. Current balance: $50."

account.withdraw('1234', 10);
// "Withdrawal amount exceeds account balance. Transaction cancelled."

account.changePin('1234', '5678');
// "PIN successfully changed!"
