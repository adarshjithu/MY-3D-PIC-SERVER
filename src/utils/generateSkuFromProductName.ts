
export const generateSkuFromProductName = async (productName: string) => {
  const prefix = productName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')  // remove spaces and special chars
    .slice(0, 5);               // first 5 characters

  const timestamp = Date.now().toString().slice(-4); // last 4 digits

  const sku = `${prefix}-${timestamp}`; // e.g. "CRYST-4821"
  return sku;
};
