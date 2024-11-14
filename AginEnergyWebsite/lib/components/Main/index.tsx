import { mainContainer, mainStyles } from "./styles";

export function Main({ children, bg }: { children?: React.ReactNode, bg?: 'white' | 'gray' }) {
    return (
        <div className={mainContainer({ bg })}>
            <div className={mainStyles}>
                {children}
            </div>
        </div>
    )
}