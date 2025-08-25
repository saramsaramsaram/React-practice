"use client";
import { useState } from "react";

export default function BoardEdit({ params, current }: { params: { id: string }; current: any }) {
  const [form, setForm] = useState({ title: current.title, author: current.author, content: current.content, password: "" });

  const update = async () => {
    await fetch(`/board/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("수정 완료!");
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <input placeholder="제목" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="내용" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
      <input type="password" placeholder="비밀번호" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={update}>수정하기</button>
    </div>
  );
}
