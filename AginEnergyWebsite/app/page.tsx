import { Flex, Highlight, Title } from '@/lib/components';
import { IconLeaf } from '@tabler/icons-react';

export default function Home() {
    return (
        <div>
            <Flex>
                <Title size="lg" color="inherit">
                    Oszczędzaj prąd z
                </Title>
                <Highlight color="green" icon={IconLeaf}>
                    <Title size="lg" color="inherit">
                        Agin Energy
                    </Title>
                </Highlight>
            </Flex>
        </div>
    );
}
