export function formatNumberWithCommas(number) {
  if (typeof number !== "number") {
    throw new Error("Input must be a number");
  }

  return number.toLocaleString("en-US");
}
