import { sva } from "@/styled-system/css"

export type OptionProps = {
    label: string,
    active?: boolean,
}

export function Option({ label, active }: OptionProps) {
    const classes = optionClasses({ active });

    return (
        <div className={classes.container}>
            <div className={classes.option}>{label}</div>
            <div className={classes.indicatorContainer}>
                <div className={classes.indicator}></div>
            </div>
        </div>
    )
}

const optionClasses = sva({
    slots: ['option', 'indicator', 'container', 'indicatorContainer'],
    base: {
        container: {
            position: 'relative',
            cursor: 'pointer',
        },
        option: {
            fontSize: '15px',
            color: 'text.1',
            transition: 'color 0.3s ease',
            fontWeight: 500,
        },
        indicator: {
            width: '0px',
            opacity: 0,
            transition: 'all .3s ease',
            height: '3px',
            borderRadius: '3px',
            backgroundColor: 'green.8',
        },
        indicatorContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            transform: 'translateY(calc(100% + 3px))',
            display: 'flex',
            justifyContent: 'center',
        }
    },
    variants: {
        active: {
            true: {
                indicator: {
                    opacity: 1,
                    width: '25px',
                },
                option: {
                    fontWeight: 600,
                    color: 'text.0',
                }
            }
        }
    }
})