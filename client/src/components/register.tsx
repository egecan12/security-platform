import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.text();
    alert(data);
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <input
        placeholder="Kullanıcı Adı"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Kayıt Ol</button>
    </div>
  );
};

export default Register;
