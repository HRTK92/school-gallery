import { Button, Grid, Input } from '@nextui-org/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState<string>('')
  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id as string)
    }
  }, [router.query.id])
  return (
    <>
      <Grid.Container justify='center' gap={4}>
        <Grid css={{ margin: 20 }}>
          <Input underlined labelPlaceholder='ID' color='default' value={id} onChange={(e)=>setId(e.target.value)} />
            <Button onClick={()=>router.push(`/${id}/photos`)} css={{ marginTop: 10 }} shadow>
              Go
            </Button>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default Home
