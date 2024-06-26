import { NextRequest, NextResponse } from "next/server";
import { geoApiCtx, openWeatherApiKey } from "../context";
import siteConfg from "@/app/siteConfg";

export async function GET(req: NextRequest): Promise<any> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    const data = (
      await geoApiCtx.get(
        `direct?q=${query}&limit=${siteConfg.fetchLimit.cities}&appid=${openWeatherApiKey}`
      )
    ).data;

    return NextResponse.json(data);
  } catch (error) {
    return new Response("Something went wrong trying to fetch geocoded data", {
      status: 500,
    });
  }
}
