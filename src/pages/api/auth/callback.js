/*import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const cookieStore = cookies()
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
	const { searchParams } = new URL(req.url)
	const code = searchParams.get('code')
	const callback = searchParams.get('callback')

	if (code) {
		await supabase.auth.exchangeCodeForSession(code)
	}

	return NextResponse.redirect(new URL(callback ? callback : '/', req.url))
}*/

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req, res) => {
    const { code, callback } = req.query

    if (code) {
        const supabase = createPagesServerClient({ req, res })
        await supabase.auth.exchangeCodeForSession(String(code))
    }

    res.redirect(callback ? callback : '/')
}

export default handler