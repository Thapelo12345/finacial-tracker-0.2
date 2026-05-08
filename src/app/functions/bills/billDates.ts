
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

function getNextPaymentDate(
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

function nextPaymentDate(start: Date, due: string, frequently: string) {
  const dueDate = new Date(due);
  const newDate = start;
  const targetDate = dueDate.getDate();
  let formatedTime = "";

  if (frequently == "monthly") {

    if (
      start.getDate() == targetDate ||
      !(
        start.getDate() < targetDate &&
        new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate() >=
          targetDate
      )
    ) {
      newDate.setDate(1);
      newDate.setMonth(start.getMonth() + 1);

      const lastDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0,
      ).getDate();
      if (lastDate >= targetDate) {
        formatedTime = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(targetDate).padStart(2, "0")}`;
      } else
        formatedTime = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(lastDate).padStart(2, "0")}`;
    } else {
      formatedTime = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(targetDate).padStart(2, "0")}`;
    }
  } //end of monthly frequently
  else {
    frequently === "weekly"
      ? newDate.setDate(start.getDate() + 7)
      : newDate.setFullYear(start.getFullYear() + 1);
    formatedTime = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;
  } //end of weekly else if

  return new Date(formatedTime) == dueDate ? "wait for Due Date" : formatedTime;
} //end next payment date

function DaysLeft(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();

  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const timeDiff = due.getTime() - now.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff < 0 ? 0 : daysDiff;
}

function checkingArrears(
  amount: number,
  startdate: string,
  lastpayment: string,
  dueDate: string,
  continously: string,
) {
  let arrearsCount = 0,
    arrearsAmount = 0;

  let startingDate = lastpayment === "No payment" ? new Date(startdate) : new Date(lastpayment);
  const due = new Date(dueDate);

  while (startingDate < due) {
    const cloneDate = new Date(nextPaymentDate(startingDate, dueDate, continously));

    if (cloneDate < due) {
      arrearsCount++;
      arrearsAmount += amount;
    } //end if

    startingDate = cloneDate;
  } //end of while loop

  return { arrearsCount, arrearsAmount };
} //end of checking arrears function



export {
  validatePaymentIntervalStrict,
  getNextPaymentDate,
  nextPaymentDate,
  checkingArrears,
  DaysLeft,
};
