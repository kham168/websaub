
export const formatPrice = (price: number) => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "-";

  return new Intl.NumberFormat("lo-LA", {
    minimumFractionDigits: 0,
  }).format(num);
};
