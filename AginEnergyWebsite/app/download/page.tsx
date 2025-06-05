import { Animate, HomeSection } from '@/lib/components';
import { DownloadOption } from '@/lib/components/DownloadOption';
import { css } from '@/styled-system/css';
import { IconLeaf, IconPlug } from '@tabler/icons-react';

export default function Page() {
    return (
        <div>
            <HomeSection
                title='Pobierz'
                icon={IconLeaf}
                highlight='Agin Energy'
                description='Wybierz, co chcesz pobrać'
                image='/images/plughub.jpeg'
            >
                <Animate delay={100}>
                    <div className={css({ display: 'flex', flexDir: 'column', marginTop: '20px', gap: '10px' })}>
                        <DownloadOption
                            icon={IconLeaf}
                            label="Agin Energy"
                            description="Android"
                            url="https://github.com/TymekV/AginEnergy/releases/download/1.0.0/Agin.Energy.apk"
                        />
                        <DownloadOption
                            icon={IconPlug}
                            label="Agin Plug Emulator"
                            description="Linux"
                            url="https://github.com/TymekV/AginEnergy/releases/download/1.0.0/Agin.Plug.Emulator-1.0.0.AppImage"
                        />
                        <DownloadOption
                            icon={IconPlug}
                            label="Agin Plug Emulator"
                            description="Windows"
                            url="https://github.com/TymekV/AginEnergy/releases/download/1.0.0/Agin.Plug.Emulator-1.0.0.exe"
                        />
                        <DownloadOption
                            icon={IconPlug}
                            label="Agin Plug Emulator"
                            description="macOS"
                            url="https://github.com/TymekV/AginEnergy/releases/download/1.0.0/Agin.Plug.Emulator-1.0.0-arm64.dmg"
                        />
                    </div>
                </Animate>
            </HomeSection>
        </div>
    )
}