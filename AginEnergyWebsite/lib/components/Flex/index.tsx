import { css } from "@/styled-system/css";
import { HTMLAttributes } from "react";

export function Flex({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={flex} {...props}>
            {children}
        </div>
    )
}

const flex = css({
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
})