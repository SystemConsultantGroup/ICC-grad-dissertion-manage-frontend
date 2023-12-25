import { formatTime } from "@/components/date";
import { NextResponse } from "next/server";

export async function GET() {
  const currentServerTime = new Date();
  const formattedTime = formatTime(currentServerTime);
  return NextResponse.json({ time: formattedTime }, { status: 200 });
}
