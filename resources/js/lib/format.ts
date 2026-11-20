const tzs = new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0,
});

/** Formats whole shillings, e.g. 8000 → "TSh 8,000". */
export function formatTzs(amount: number): string {
    return tzs.format(amount);
}