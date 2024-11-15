import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { Divider, Title } from './lib/components'
import { css } from './styled-system/css'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => (
            <div className={css({ marginTop: '24px', marginBottom: '16px' })}>
                <Title size='h1' weight={600}>{children}</Title>
                <div className={css({ marginTop: '8px', })}>
                    <Divider />
                </div>
            </div>
        ),
        h2: ({ children }) => (
            <div className={css({ marginTop: '24px', marginBottom: '16px' })}>
                <Title size='h2'>{children}</Title>
                <div className={css({ marginTop: '8px', })}>
                    <Divider />
                </div>
            </div>
        ),
        h3: ({ children }) => (
            <div className={css({ marginTop: '24px', marginBottom: '16px' })}>
                <Title size='h3'>{children}</Title>
            </div>
        ),
        p: ({ children }) => (
            <div className={css({})}>{children}</div>
        ),
        line: () => (
            <Divider />
        ),
        img: (props) => (
            <Image
                // sizes="100vw"
                style={{ height: '400px', marginTop: '8px', marginBottom: '8px' }}
                {...(props as ImageProps)}
            />
        ),
        ...components,
    }
}