import Docs from '@/markdown/docs.mdx'
import { css } from '@/styled-system/css'

export default function Page() {
    return <div className={pageStyles}>
        <Docs />
    </div>
}

const pageStyles = css({
    marginTop: '60px',
    padding: '12px 50px'
});