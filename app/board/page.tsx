"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  likes: number;
  password?: string;
};

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ title: "", author: "", content: "", password: "" });

  const fetchPosts = async () => {
    const res = await fetch("/api/board");
    setPosts(await res.json());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.author || !form.content || !form.password) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    await fetch("/api/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", author: "", content: "", password: "" });
    fetchPosts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>게시판 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/board/${post.id}`}>
              <strong>{post.title}</strong> - {post.author} ({post.likes} 👍)
            </Link>
          </li>
        ))}
      </ul>

      <h2>새 글 작성</h2>
      <input
        placeholder="제목"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={{ display: "block", margin: "5px 0" }}
      />
      <input
        placeholder="작성자"
        value={form.author}
        onChange={e => setForm({ ...form, author: e.target.value })}
        style={{ display: "block", margin: "5px 0" }}
      />
      <textarea
        placeholder="내용"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        style={{ display: "block", margin: "5px 0", width: "300px", height: "100px" }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{ display: "block", margin: "5px 0" }}
      />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}
