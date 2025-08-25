import { NextRequest, NextResponse } from "next/server";
import { posts } from "../route"; // board/route.ts posts 참조

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === Number(params.id));
  if (!post) return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { title, author, content, password } = await req.json();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
  if (posts[index].password !== password) return NextResponse.json({ error: "비밀번호 틀림" }, { status: 403 });
  posts[index] = { ...posts[index], title, author, content };
  return NextResponse.json(posts[index]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { password } = await req.json();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
  if (posts[index].password !== password) return NextResponse.json({ error: "비밀번호 틀림" }, { status: 403 });
  posts.splice(index, 1);
  return NextResponse.json({ success: true });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
  posts[index].likes += 1;
  return NextResponse.json({ likes: posts[index].likes });
}
