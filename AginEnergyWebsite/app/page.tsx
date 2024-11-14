import { Flex, Highlight, Main, Text, Title } from '@/lib/components';
import { css } from '@/styled-system/css';
import { IconHomeEco, IconLeaf, IconPlug } from '@tabler/icons-react';

export default function Home() {
    return (
        <div>
            <Main>
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
                    <div className={css({ marginTop: 3 })}>
                        <Text>
                            Agin Energy to system inteligentnych gniazdek, który mierzy zużycie energii i wyświetla statystyki, pomagając użytkownikom oszczędzać prąd i pieniądze. Dzięki analizie danych aplikacja sugeruje, jak zmniejszyć zużycie energii, wspierając ekologiczne i ekonomiczne decyzje.
                        </Text>
                    </div>
                </div>

                <img src="/images/plughub.jpeg" className={css({ width: '450px' })} />
            </Main>
            <Main>
                <img src="/images/plug-1.jpeg" className={css({ width: '450px' })} />

                <div>
                    <Flex>
                        <Title size="lg" color="inherit">
                            Kontroluj urządzenia z
                        </Title>
                        <Highlight color="green" icon={IconPlug}>
                            <Title size="lg" color="inherit">
                                Agin Plug
                            </Title>
                        </Highlight>
                    </Flex>
                    <div className={css({ marginTop: 3 })}>
                        <Text>
                            Agin Plug to inteligentna wtyczka oparta na mikrokontrolerze ESP8266 i ESPHome, jest to zmodyfikowane gniazdko firmy Tauron. Wtyczka jest wyposażona w układ pomiarowy ADE7763, który precyzyjnie mierzy napięcie i zużycie energii. Agin Plug łączy się z Agin Hub, umożliwiając użytkownikom zdalne monitorowanie i kontrolowanie poboru prądu oraz optymalizację zużycia energii.
                        </Text>
                    </div>
                </div>
            </Main>
            <Main>
                <div>
                    <Flex>
                        <Title size="lg" color="inherit">
                            Wszystkim steruje
                        </Title>
                        <Highlight color="green" icon={IconHomeEco}>
                            <Title size="lg" color="inherit">
                                Agin Hub
                            </Title>
                        </Highlight>
                    </Flex>
                    <div className={css({ marginTop: 3 })}>
                        <Text>
                            Agin Energy to system inteligentnych gniazdek, który mierzy zużycie energii i wyświetla statystyki, pomagając użytkownikom oszczędzać prąd i pieniądze. Dzięki analizie danych aplikacja sugeruje, jak zmniejszyć zużycie energii, wspierając ekologiczne i ekonomiczne decyzje.
                        </Text>
                    </div>
                </div>

                <img src="/images/hub.png" className={css({ width: '450px' })} />
            </Main>
        </div>
    );
}
