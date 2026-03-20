import type { User } from "../types/User";

type UserListProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id?: number) => void;
};

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">User List</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {users.length} users
        </span>
      </div>

      {users.length === 0 ? (
        <p className="text-slate-500">No users found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md"
            >
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-slate-900">
                  {user.fullName}
                </h4>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>Phone: {user.phone}</p>
                <p>License: {user.licenseNumber}</p>
                <p>Balance: Rs. {user.accountBalance}</p>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}