function GetDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
} //end of get date function

function validatePaymentIntervalStrict(
  startDate: Date | string,
  dueDate: Date | string,
): string {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate;

  if (isNaN(start.getTime()) || isNaN(due.getTime()) || due <= start) {
    return "invalid";
  }

  const timeDiff = due.getTime() - start.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Very strict tolerance (exact or 1 day difference only)
  if (dayDiff === 7 || dayDiff === 6 || dayDiff === 8) {
    return "weekly";
  }

  // Monthly: 28-31 days (covers most month variations)
  if (dayDiff >= 28 && dayDiff <= 31) {
    return "monthly";
  }

  // Yearly: 365 days ± 1 day (accounts for leap years)
  if (dayDiff === 365 || dayDiff === 364 || dayDiff === 366) {
    return "yearly";
  }

  return "custom";
}

function getNextDueDate(
  startDate: string,
  dueDate: string,
  frequency: string,
): string {
  const currentDate = new Date();
  const start = new Date(startDate);
  const due = new Date(dueDate);

  // If due date is in the past, we need to calculate the next cycle
  if (due <= currentDate) {
    const nextDate = new Date(due);

    switch (frequency) {
      case "weekly":
        while (nextDate <= currentDate) {
          nextDate.setDate(nextDate.getDate() + 7);
        }
        break;
      case "monthly":
        while (nextDate <= currentDate) {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }
        break;
      case "yearly":
        while (nextDate <= currentDate) {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
        }
        break;
      default: {
        // For invalid frequency, return due date as is
        const dueYear = due.getFullYear();
        const dueMonth = String(due.getMonth() + 1).padStart(2, "0");
        const dueDay = String(due.getDate()).padStart(2, "0");
        return `${dueYear}-${dueMonth}-${dueDay}`;
      }
    }

    // Format the future date
    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const day = String(nextDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // If due date is in the future, calculate next payment from start date
  const nextDate = new Date(start);

  switch (frequency) {
    case "weekly":
      while (nextDate <= currentDate) {
        nextDate.setDate(nextDate.getDate() + 7);
      }
      break;
    case "monthly":
      while (nextDate <= currentDate) {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      break;
    case "yearly":
      while (nextDate <= currentDate) {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
      break;
    default: {
      const dueYear = due.getFullYear();
      const dueMonth = String(due.getMonth() + 1).padStart(2, "0");
      const dueDay = String(due.getDate()).padStart(2, "0");
      return `${dueYear}-${dueMonth}-${dueDay}`;
    }
  }

  // Return the earlier of next payment date or due date
  const resultDate = nextDate < due ? nextDate : due;

  // Format as YYYY-MM-DD
  const year = resultDate.getFullYear();
  const month = String(resultDate.getMonth() + 1).padStart(2, "0");
  const day = String(resultDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function nextPaymentDate(start: Date, duePayment: string, frequently: string) {
  const due = new Date(duePayment)
  const cloneStart = start

  if(frequently == "yearly"){
      cloneStart.setFullYear(cloneStart.getFullYear() + 1)
  }//end of if

  else if(frequently == "monthly"){
    cloneStart.setDate(1)
    cloneStart.setMonth(cloneStart.getMonth() + 1)
    const lastDay = new Date( cloneStart.getFullYear(), cloneStart.getMonth() + 1, 0);
    cloneStart.setDate(lastDay.getDate() < due.getDate() ? lastDay.getDate() : due.getDate())
  }//end of else if

  else{ cloneStart.setDate(cloneStart.getDate() + 7)}

 return cloneStart.toISOString().split("T")[0]
} //end next payment date

function checkingArrears(
  amount: number,
  startdate: string,
  lastpayment: string,
  dueDate: string,
  continously: string,
) {
  let arrearsCount = 0,
    arrearsAmount = 0;

  let startingDate = new Date(lastpayment === "No payment" ? startdate : lastpayment)
  const currentDate = new Date()
  const due = new Date(dueDate);

  while (startingDate < due && startingDate < currentDate) {

    startingDate = new Date(nextPaymentDate(startingDate, dueDate, continously));

    if (startingDate.toISOString().split("T")[0] == due.toISOString().split("T")[0]) break

    arrearsCount++;
    arrearsAmount += amount;
  } //end of while loop

  return { arrearsCount, arrearsAmount };
} //end of checking arrears function

export {
  GetDate,
  validatePaymentIntervalStrict,
  getNextDueDate,
  nextPaymentDate,
  checkingArrears,
};
