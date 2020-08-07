import Head from 'next/head'
import Link from 'next/link'
import fetch from 'node-fetch'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import useSWR from 'swr'

export default function Home ({ apiData }) {
  // console.log(apiData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Web dev from DK</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={`${utilStyles.headingLh} font-black`}>API DATA</h2>
        <pre>
          <code className="whitespace-pre-wrap break-words">{ JSON.stringify(apiData) }</code>
        </pre>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={`${utilStyles.headingLh} font-black`}>API DATA from SWR</h2>
        <pre>
          <Profile />
        </pre>
      </section>
      <div>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://swapi.dev/api/people/1/`)
  const apiData = await res.json()

  // Pass data to the page via props
  return { props: { apiData } }
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Profile() {
  const { data, error } = useSWR('https://swapi.dev/api/people/2/', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <code>hello {data.name}!</code>
} 