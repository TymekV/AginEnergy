import { css } from "@/styled-system/css";
import { Animate } from "./Animate";
import { Flex } from "./Flex";
import { Highlight } from "./Highlight";
import { Main } from "./Main";
import { Title } from "./Title";
import { Text } from "./Text";
import { Icon } from "@tabler/icons-react";

export interface HomeSectionProps {
    title: string;
    highlight?: string;
    icon?: Icon;
    description?: string,
    image: string,
    children?: React.ReactNode;
    imageBefore?: boolean;
}

interface LeftProps {
    title: string;
    highlight?: string;
    icon?: Icon;
    description?: string;
    children?: React.ReactNode;
    isLeft?: boolean;
}

function Left({ title, highlight, icon, description, isLeft, children }: LeftProps) {
    return (
        <div>
            <Animate delay={isLeft ? 0 : 100}>
                <Flex>
                    <Title size="lg" color="inherit">
                        {title}
                    </Title>
                    <Highlight color="green" icon={icon}>
                        <Title size="lg" color="inherit">
                            {highlight}
                        </Title>
                    </Highlight>
                </Flex>
            </Animate>
            <Animate delay={isLeft ? 100 : 200}>
                <div className={css({ marginTop: 3 })}>
                    <Text>
                        {description}
                    </Text>
                </div>
            </Animate>
            {children}
        </div>
    )
}

export function HomeSection({ title, highlight, icon, description, image, imageBefore, children }: HomeSectionProps) {
    return (
        <Main>
            {!imageBefore && <Left
                title={title}
                highlight={highlight}
                icon={icon}
                description={description}
                isLeft={true}
            >
                {children}
            </Left>}
            <Animate delay={imageBefore ? 0 : 200} className={css({ minW: '450px' })}>
                <img src={image} className={css({ width: '450px' })} />
            </Animate>
            {imageBefore && <Left
                title={title}
                highlight={highlight}
                icon={icon}
                description={description}
                isLeft={false}
            >
                {children}
            </Left>}
        </Main>
    )
}