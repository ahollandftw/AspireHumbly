import { discountCodes } from "@/data/products";

export default function AdminDiscountsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">Discount Codes</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Discount codes are defined in src/data/products.ts
      </p>

      <div className="mt-8 overflow-x-auto border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Min Order</th>
              <th className="px-4 py-3 font-medium">Active</th>
            </tr>
          </thead>
          <tbody>
            {discountCodes.map((code) => (
              <tr key={code.code} className="border-b border-neutral-100">
                <td className="px-4 py-3 font-mono">{code.code}</td>
                <td className="px-4 py-3 capitalize">{code.type}</td>
                <td className="px-4 py-3">
                  {code.type === "percentage" ? `${code.value}%` : `$${(code.value / 100).toFixed(2)}`}
                </td>
                <td className="px-4 py-3">
                  {code.minOrder ? `$${(code.minOrder / 100).toFixed(2)}` : "—"}
                </td>
                <td className="px-4 py-3">{code.active ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
