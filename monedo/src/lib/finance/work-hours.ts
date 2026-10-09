export type WorkTime = {
  /** Exact hours of work needed, e.g. 11.25. */
  hours: number;
  /** Whole hours and remaining minutes, rounded to the nearest minute: 11 h 15 min. */
  wholeHours: number;
  minutes: number;
};

/**
 * How many hours of work a purchase costs at a given net hourly wage.
 * Returns null when the inputs cannot produce a meaningful answer
 * (non-finite numbers, negative price, or a wage that is not positive).
 */
export function workHoursFor(price: number, netHourlyWage: number): WorkTime | null {
  if (!Number.isFinite(price) || !Number.isFinite(netHourlyWage)) return null;
  if (price < 0 || netHourlyWage <= 0) return null;

  const hours = price / netHourlyWage;
  const totalMinutes = Math.round(hours * 60);
  return {
    hours,
    wholeHours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

/**
 * Net hourly wage from a pay amount and the hours it covers
 * (e.g. 40 € for a 5-hour Saturday shift → 8 €/h). Null if hours is not positive.
 */
export function hourlyWage(netPay: number, hoursWorked: number): number | null {
  if (!Number.isFinite(netPay) || !Number.isFinite(hoursWorked)) return null;
  if (netPay < 0 || hoursWorked <= 0) return null;
  return netPay / hoursWorked;
}

/** Yearly cost of a recurring monthly expense. */
export function yearlyCost(monthlyAmount: number): number {
  if (!Number.isFinite(monthlyAmount) || monthlyAmount < 0) return 0;
  return Math.round(monthlyAmount * 12 * 100) / 100;
}
