import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req, res) => {
    const supabase = createPagesServerClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        await supabase.auth.signOut()
    }

    res.redirect('/login')
}

export default handler