# Agin Energy

zdjecie tutaj

## Aplikacja Agin Energy

### Opis

**Agin Energy** to aplikacja na telefony z systemem android i ios, która z pomocą inteligentnego huba i gniazdek mierzy zużycie energii i wyświetla statystyki, pomagając użytkownikom oszczędzać prąd i pieniądze. Dzięki analizie danych aplikacja sugeruje, jak zmniejszyć zużycie energii, wspierając ekologiczne i ekonomiczne decyzje.

### Działanie

**Agin Energy** jest clientem pozwalającym zarządzać systemem huba z gniazdkami, jednak w przeciwieństwie do większości aplikacji typu smart home zwraca ona uwagę na aspekt oszczędności energii. Jej zadaniem jest pomóc zobrazować wykorzystanie energii w domu i zmotywować do podjęcia działań na rzecz środowiska. Aplikacja została zbudowana w środowisku React Native przez co może być dostępna zarówno na androidzie jak i na ios. Posiada ona takie funkcje jak:

- Pokazywanie ile prądu zużywają wszystkie gniazdka połączone z aplikacją
- Pokazywanie wszystkich wartości jakie rejestruje gniazdko (napięcie, natężenie, moc, temperatura urządzenia)
- Dzięki wykorzystaniu huba, który zapisuje wartości gniazdek do bazy, możliwe jest odczytanie i analiza zużycia w czasie i porównania trędów zużycia prądu
- Powiadomienia push, które w przypadku nadmiernego zużycia prądu poinformują użytkownika i zachęcą go do wyłączenia urządzenia

### Tutorial

sdafgblasidhfasf

## Agin Plug

### Opis

**Agin Plug** to inteligentna wtyczka oparta na mikrokontrolerze ESP8266 i ESPHome, jest to zmodyfikowane gniazdko firmy Tauron. Wtyczka jest wyposażona w układ pomiarowy ADE7763, który precyzyjnie mierzy napięcie i zużycie energii. Agin Plug łączy się z Agin Hub, umożliwiając użytkownikom monitorowanie i kontrolowanie poboru prądu oraz optymalizację zużycia energii.

### Działanie

**Agin Plug** to inteligentne gniazdko, które mierzy dane i przekazuje je hubowi za pomocą SSE. Jest one zmodyfikowaną wersją gniazdka firmy Tauron poprzez dodanie do niego ESP8266 z wgranym oprogramowaniem ESPHome. Rozwiązanie takie jest wygodne, ponieważ nie wymaga zakupienia konkretnego sprzetu i daje możliwość użycia jakiegokolwiek inteligentnego gniazdka z odpowiednim układem pomiarowym.

### Emulator

Na potrzeby prezentacji aplikacji przygotowaliśmy aplikacje w środowisku Electron.js, która wiernie oddaje działanie prawdziwego urządzenie, z tą różnicą, że zamiast mierzyć wartości, są one generowanie losowo z zakresu podanego przez użytkownika.

## Agin Hub

### Opis

**Agin Hub** to inteligentny hub oparty na Raspberry Pi 3, który zarządza systemem Agin Energy. Łączy się z gniazdkami Agin Plug, zbiera dane o zużyciu energii i udstępnia je do aplikacji mobilnej. Agin Hub umożliwia zdalne monitorowanie i sterowanie urządzeniami, dzięki czemu użytkownicy mogą optymalizować zużycie prądu w domu, wspierając efektywne i ekologiczne zarządzanie energią.

### Działanie

Software Huba działa w środowisku Node.js, przez co za hub może posłużyć tak naprawdę każdy komputer. Zastosowanie huba było potrzebne, aby zbierać dane ze wszystkich gniazdek, analizować je i w razie potrzeby wysyłać powiadomienia push na telefon. Hub pozwala też na podgląd zużycia na wielu instancjach aplikacji w czasie rzeczywistym. Komunikuje on się z telefonem za pomocą socket.io, zbiera informacje z gniazdek przez SSE i zapisuje je w bazie InfluxDB, co pozwala na ich późniejszy przegląd w aplikacji. Program Huba pamięta przypisane mu gniazdka, wraz z ustawionymi im przez użytkownika nazwami, zapisując je w MongoDB. Użycie jako urządzenia Raspberry pi, pozwala na dużą energooszczędność ze względu na taką specyfikę urządzenia, jednak nic nie stoi na przeszkodzie, aby w roli huba użyć np. domowy server.

## Na jakie potrzeby odpowiada najsze rozwiązanie?

W Polsce na obecny moment ponad 80% źródeł energii to paliwa kopalne, które powodują znaczną produkcje dwutlenku węgla, dlatego tak ważne jest teraz, aby zastanowić się czy chcemy dokładać się do dalszego zanieczyszczania środowiska, czy może możemy zrezygnować z niepotrzebnie palącego się światła lub nieustannie działającego telewizora. Większość ludzi nie jest w stanie wyobrazić sobie ile prądu potrafią zużyć pojedyńcze urządzenia, tym bardziej w skali czasu, w czym pomóc ma nasza aplikacja. Wierzymy, że jeżeli każdy zacznie od nawet niewielkiego zmniejszenia zużycia prądu, eliminując niepotrzebne działanie urządzeń, to w większej skali jest to w stanie zrobić realną różnicę na środowiku.

## Wszystkie technologie użyte w tym projekcie

### Środowiska:

- Node.js
- React
- React Native
- Electron.js
- PlatformIO
- Lekko zmodyfikowane ESPHome

### Języki programowania:

- TypeScript
- C++

## Dalszy rozwój projektu

Projekt ma dużo miejsca na rozwój i poprawki, bo niestety naszym największym wrogiem był czas. Jest dużo funkcji, które chcemy zaimplementować i wierzymy, że uda się to w przyszłości zrealizować. Projekt chcielibyśmy zachować w modelu open source, gdzie każdy mógłby nad nim pracować i przyczynić się do jego rozwoju. Nasze rozwiązanie na ten moment kierujemy głównie do pasjonatów robótek typu DIY, bo nie mamy możliwości produkcji gotowych produktów, co skutkuje potrzebą samodzielnego zmodyfikowania gniazdka i postawienia naszego oprogramowania na komputerze typu RaspberryPi. Chielibyśmy, aby projekt w przyszłości był bardziej "Plug and play".

## Ryzyka naszego rozwiązania

Głównym zagrożeniem dla naszego projektu jest pośpiech, który spowodował, że nie zdążyliśmy jeszcze wyeliminować wszystkich błędów występujących w aplikacji, przez co doświadczenie z użytkowania systemu może nie być takie, jakiego byśmy sobie życzyli. Problemem jest również konieczność posiadania fizycznych urządzeń do działania aplikacji, przez co zniechęci to zapewne część osób przez korzystaniem z tego rozwiązania.

## Dlaczego powinniśmy wygrać?

Uważamy, że nasz projekt ma praktyczne zastosowanie i pomimo swoich niedoskonałości, jest w stanie pomóc w byciu bardziej ekologicznym. W projekt zainwestowaliśmy cały swój wolny czas, którego i tak nie posiadamy zbyt dużo ze względu na dużą ilość nauki w szkole. Pomimo, że w czasie pisania aplikacji wielokrotnie wyrywaliśmy sobie włosy na głowie, próbując rozwiązać czasami trywialne, a czasami nieoczywiste błędy, to przeprawa ta pozwoliła nam wyciągnąć dużo doświadczenia na przyszość. Wygrana pozwoliłaby nam na dalszy rozwój tego projektu, ulepszenie jego technologii (np. zaprojektowanie autoskich gniazdek), ale i rozpoczęcie nowych projektów, które miałyby na celu pomagać w życiu codziennym.
