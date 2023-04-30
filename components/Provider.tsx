'use client'

import { ThemeProvider } from 'next-themes'

const Provider = ({
  children,
}: {
  children: React.ReactNode
})  => {
  return (
    <ThemeProvider attribute='class' enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}

export default Provider