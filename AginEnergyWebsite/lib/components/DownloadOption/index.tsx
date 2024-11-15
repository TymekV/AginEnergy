import { Icon, IconFile } from "@tabler/icons-react";
import { leftStyles, optionDescription, optionLabel, optionStyles } from "./styles";
import { token } from "@/styled-system/tokens";

export type DownloadOptionProps = {
    icon?: Icon,
    label: string,
    url?: string,
    description?: string,
}

export function DownloadOption({ icon: Icon, label, url, description }: DownloadOptionProps) {
    return (
        <a href={url} target="_blank">
            <div className={optionStyles}>
                <div className={leftStyles}>
                    {Icon && <Icon size={20} />}
                    <div>
                        <div className={optionLabel}>{label}</div>
                        {description && <div className={optionDescription}>{description}</div>}
                    </div>
                </div>
                <IconFile size={16} color={token('colors.green.8')} />
            </div>
        </a>
    )
}