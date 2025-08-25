"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  likes: number;
  password?: string;
};

export default function BoardDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", content: "", password: "" });

  const fetchPost = async () => {
    const res = await fetch("/api/board");
    const data: Post[] = await res.json();
    const found = data.find(p => p.id === Number(id));
    setPost(found || null);
    if (found) setForm({ title: found.title, author: found.author, content: found.content, password: "" });
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleUpdate = async () => {
    if (!form.password) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    await fetch(`/api/board/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditing(false);
    fetchPost();
  };

  const handleDelete = async () => {
    const pwd = prompt("비밀번호를 입력해주세요");
    if (!pwd) return;
    await fetch(`/api/board/${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    router.push("/board");
  };

  const handleLike = async () => {
    await fetch(`/api/board/${post.id}/like`, { method: "POST" });
    fetchPost();
  };

  return (
    <div style={{ padding: 20 }}>
      {!editing ? (
        <>
          <h1>{post.title}</h1>
          <p>작성자: {post.author}</p>
          <p>{post.content}</p>
          <p>좋아요: {post.likes} 👍</p>
          <button onClick={handleLike}>❤️ 좋아요</button>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setEditing(true)}>✏️ 수정</button>
            <button style={{ marginLeft: 10 }} onClick={handleDelete}>🗑 삭제</button>
            <button style={{ marginLeft: 10 }} onClick={() => router.push("/board")}>← 목록으로</button>
          </div>
        </>
      ) : (
        <>
          <h2>게시글 수정</h2>
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
          <button onClick={handleUpdate}>✅ 수정 완료</button>
          <button style={{ marginLeft: 10 }} onClick={() => setEditing(false)}>✖️ 취소</button>
        </>
      )}
    </div>
  );
}
