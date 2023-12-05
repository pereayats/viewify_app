import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })

	const { data: { user } } = await supabase.auth.getUser()

	// If user is not signed in, redirect to /login
	if (!user) return NextResponse.redirect(new URL('/login', req.url))
	else return res
}

export const config = {
	matcher: ['/dashboard'],
}