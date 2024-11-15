import { Animate, HomeSection } from '@/lib/components';
import { DownloadOption } from '@/lib/components/DownloadOption';
import { css } from '@/styled-system/css';
import { IconCode, IconLeaf, IconPlug } from '@tabler/icons-react';

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
                            icon={IconCode}
                            label="Kod"
                            url=""
                        />
                        <DownloadOption
                            icon={IconPlug}
                            label="Agin Plug Emulator"
                            description="Linux"
                            url=""
                        />
                    </div>
                </Animate>
            </HomeSection>
        </div>
    )
}