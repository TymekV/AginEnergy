import { css } from "@/styled-system/css"

export function Divider() {
    return (
        <div className={dividerStyles}></div>
    )
}

export const dividerStyles = css({
    width: '100%',
    height: '1px',
    backgroundColor: '#00000020'
})