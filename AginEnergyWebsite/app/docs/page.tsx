import { Animate } from '@/lib/components';
import Docs from '@/markdown/docs.mdx'
import { css } from '@/styled-system/css'

export default function Page() {
    return <div className={pageStyles}>
        <Animate delay={0}>
            <Docs />
        </Animate>
    </div>
}

const pageStyles = css({
    marginTop: '60px',
    padding: '12px 50px'
});