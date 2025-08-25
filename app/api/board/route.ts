import { NextRequest, NextResponse } from "next/server";

export let posts: any[] = []; // 메모리 저장

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, author, content, password } = await req.json();
  const id = Date.now();
  posts.push({ id, title, author, content, password, likes: 0 });
  return NextResponse.json({ id });
}
