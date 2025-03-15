import React from "react";
export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <button>
        <a href="/">Home</a>
      </button>
      <button>
        <a href="/login">Login</a>
      </button>
    </div>
  );
}
