import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const from = location.state.from || "/";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    auth!.signIn({ name, password }, () => navigate(from, { replace: true }));
  }

  return (
    <div className="flex justify-center items-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="border-2 flex flex-col justify-center items-center p-4 rounded-lg w-[700px]"
      >
        <h1 className="mb-4 text-2xl">Логин</h1>
        <div className="w-full max-w-md space-y-3">
          <input
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white m-2 text-black"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black"
          />
          <button className="border-2 py-2 px-4 my-2" type="submit">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}
