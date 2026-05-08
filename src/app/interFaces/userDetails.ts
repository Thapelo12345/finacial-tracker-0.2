
interface USERDETAILS{
avatar: string;
budgetAmount: number;
budgetExpense: number;
budgetExpenses: {
Amount: number;
Color: string;
DescriptionTitle: string;
budgetExpenseId: number;
}[];
budgetSurplus:number;
currentBalance: number;
email: string;
giftCard:number;
id: string;
imageId: string;
income: number;
name: string;
// pots
potsValue: number;
recurringBills:{
AutoPay: boolean;
amount: number;
category: string;
description: string;
dueDate: string;
duration: string;
endDate: string;
frenquently: string;
id: number;
lastPayment: string;
startDate: string
status: string;
title: string}[];
savings: number;
transactionExpense: number;
transactionTotal: number;
transactions:{
amount: number;
category: string;
date: string;
description: string;
name: string;
transactionType: string;
}[];
vouchers:number;
}