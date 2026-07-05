import { getSubscribers } from "@/lib/db";

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight uppercase">Email Subscribers</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {subscribers.length} subscribers collected from newsletter signups and popup
      </p>

      {subscribers.length === 0 ? (
        <p className="mt-8 text-neutral-500">No subscribers yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-neutral-100">
                  <td className="px-4 py-3">{sub.email}</td>
                  <td className="px-4 py-3 capitalize">{sub.source}</td>
                  <td className="px-4 py-3">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
