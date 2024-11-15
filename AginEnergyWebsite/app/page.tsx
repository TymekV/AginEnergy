import { HomeSection } from '@/lib/components';
import { IconHomeEco, IconLeaf, IconPlug } from '@tabler/icons-react';

export default function Home() {
    return (
        <div>
            <HomeSection
                title="Oszczędzaj prąd z"
                highlight="Agin Energy"
                icon={IconLeaf}
                description="Agin Energy to system inteligentnych gniazdek, który mierzy zużycie energii i wyświetla statystyki, pomagając użytkownikom oszczędzać prąd i pieniądze. Dzięki analizie danych aplikacja sugeruje, jak zmniejszyć zużycie energii, wspierając ekologiczne i ekonomiczne decyzje."
                image="/images/app.png"
            />
            <HomeSection
                title="Kontroluj urządzenia z"
                highlight="Agin Plug"
                icon={IconPlug}
                description="Agin Plug to inteligentna wtyczka oparta na mikrokontrolerze ESP8266 i ESPHome, jest to zmodyfikowane gniazdko firmy Tauron. Wtyczka jest wyposażona w układ pomiarowy ADE7763, który precyzyjnie mierzy napięcie i zużycie energii. Agin Plug łączy się z Agin Hub, umożliwiając użytkownikom zdalne monitorowanie i kontrolowanie poboru prądu oraz optymalizację zużycia energii."
                image="/images/plug-1.jpeg"
                imageBefore
            />
            <HomeSection
                title="Wszystkim steruje"
                highlight="Agin Hub"
                icon={IconHomeEco}
                description=" Agin Energy to system inteligentnych gniazdek, który mierzy zużycie energii i wyświetla statystyki, pomagając użytkownikom oszczędzać prąd i pieniądze. Dzięki analizie danych aplikacja sugeruje, jak zmniejszyć zużycie energii, wspierając ekologiczne i ekonomiczne decyzje."
                image="/images/hub.png"
            />
        </div>
    );
}
