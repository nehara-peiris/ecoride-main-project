import type { User } from "../types/User";

type UserListProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id?: number) => void;
};

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>User List</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p><strong>{user.fullName}</strong></p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.licenseNumber}</p>
              <p>Balance: {user.accountBalance}</p>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}