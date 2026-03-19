import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function UsersPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>EcoRide - Users</h1>
      <UserForm />
      <UserList />
    </div>
  );
}