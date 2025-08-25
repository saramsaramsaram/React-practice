"use client";
import { useState } from "react";

export default function BoardDelete({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({ author: "", password: "" });

  const remove = async () => {
    await fetch(`/board/${params.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("삭제 완료!");
    window.location.href = "/board";
  };

  return (
    <div>
      <h2>게시글 삭제</h2>
      <input placeholder="작성자" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
      <input type="password" placeholder="비밀번호" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={remove}>삭제하기</button>
    </div>
  );
}
