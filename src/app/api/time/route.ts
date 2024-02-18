import { formatTime } from "@/components/common/Clock/date/format";
import { NextResponse } from "next/server";

export async function GET() {
  const currentServerTime = new Date();
  const formattedTime = formatTime(currentServerTime);
  return NextResponse.json({ time: formattedTime }, { status: 200 });
}
