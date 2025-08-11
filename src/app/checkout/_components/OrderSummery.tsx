export default function OrderSummery({
  subtotal,
  discount,
  shipping,
  total,
}: {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
      <div className="text-center mb-4">
        <p className="text-black font-medium">Your total payable amount is</p>
        <h3
          className="text-3xl font-bold text-primary !text-primary"
          style={{ color: "#2563eb" }}
        >
          ৳{total}
        </h3>
        <p className="text-black font-bold mt-2">Breakdown</p>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-black font-medium">Purpose</span>
          <span className="text-black font-medium">Amount</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-black">Total</span>
          <span
            className="text-primary font-bold !text-primary"
            style={{ color: "#2563eb" }}
          >
            ৳{subtotal}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-black">Shipping</span>
          <span
            className="text-primary font-bold !text-primary"
            style={{ color: "#2563eb" }}
          >
            ৳{shipping}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Discount</span>
          <span
            className="text-primary font-bold !text-primary"
            style={{ color: "#2563eb" }}
          >
            ৳{discount}
          </span>
        </div>
      </div>
    </div>
  );
}
