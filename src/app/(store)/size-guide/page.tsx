import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Aspire Humbly size guide for tees, hoodies, and apparel.",
};

const teeSizes = [
  { size: "XS", chest: '32-34"', length: '27"', shoulder: '17"' },
  { size: "S", chest: '34-36"', length: '28"', shoulder: '18"' },
  { size: "M", chest: '38-40"', length: '29"', shoulder: '19"' },
  { size: "L", chest: '42-44"', length: '30"', shoulder: '20"' },
  { size: "XL", chest: '46-48"', length: '31"', shoulder: '21"' },
  { size: "2XL", chest: '50-52"', length: '32"', shoulder: '22"' },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight uppercase">Size Guide</h1>
      <p className="mt-4 text-neutral-500">
        All measurements are approximate. For oversized fits, we recommend sizing true to size.
        For a regular fit on oversized styles, size down one.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight uppercase">Tees</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="py-3 pr-4 font-medium tracking-widest uppercase">Size</th>
                <th className="py-3 pr-4 font-medium tracking-widest uppercase">Chest</th>
                <th className="py-3 pr-4 font-medium tracking-widest uppercase">Length</th>
                <th className="py-3 font-medium tracking-widest uppercase">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {teeSizes.map((row) => (
                <tr key={row.size} className="border-b border-neutral-100">
                  <td className="py-3 pr-4 font-medium">{row.size}</td>
                  <td className="py-3 pr-4 text-neutral-600">{row.chest}</td>
                  <td className="py-3 pr-4 text-neutral-600">{row.length}</td>
                  <td className="py-3 text-neutral-600">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight uppercase">Hoodies</h2>
        <p className="mt-4 text-neutral-600">
          Hoodies run oversized with drop shoulders. Size true to size for the intended relaxed fit.
        </p>
      </section>

      <section className="mt-12 rounded border border-neutral-200 p-6">
        <h3 className="font-medium">Need help?</h3>
        <p className="mt-2 text-sm text-neutral-500">
          Contact us at support@aspirehumbly.com with your height, weight, and preferred fit
          and we&apos;ll recommend a size.
        </p>
      </section>
    </div>
  );
}
