import { NextRequest, NextResponse } from "next/server"
import { splitImage } from "../../../utils/data/image.utils"

export async function POST(request: NextRequest) {
    const arrayBuffer = await request.arrayBuffer()

    const images = await splitImage(arrayBuffer, 3 , 3)
    
    return NextResponse.json({ images });
  }