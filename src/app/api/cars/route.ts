// import { NextResponse } from 'next/server'
// import { client } from '@/sanity/lib/client'

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const recommended = searchParams.get('recommended')
  
//   let query = '*[_type == "car"]'
//   if (recommended === 'true') {
//     query += '[tags[] match "recommended"]'
//   }
  
//   try {
//     const cars = await client.fetch(query)
//     return NextResponse.json({ success: true, data: cars })
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 400 })
//   }
// }

import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const recommended = searchParams.get('recommended');

  let query = '*[_type == "car"]';
  if (recommended === 'true') {
    query += '[tags[] match "recommended"]';
  }

  try {
    const cars = await client.fetch(query);
    return NextResponse.json({ success: true, data: cars });
  } catch (error) {
    // Narrow down error type
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
  }
}
