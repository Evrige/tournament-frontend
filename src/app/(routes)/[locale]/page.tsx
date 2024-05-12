'use client'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

export default function Home() {
  const dic = useTranslations()
  const {theme, setTheme} = useTheme()
  return (
    <main className="">
      <div className="bg-amber-300 dark:bg-blue-700">Test theme</div>
      <div className=""></div>
      {/*<Test/>*/}
      <div>{dic('Index.title')}</div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </main>
  );
}
