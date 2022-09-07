import { Button, Card, Col, Grid, Image, Input, Loading, Modal, Row, Text } from '@nextui-org/react'
import { NextPage } from 'next'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

const PhotoList: NextPage = () => {
  if (typeof window === 'object') {
    document.oncontextmenu = function () {
      return false
    }
  }
  const [list, setList] = useState<Array<number>>([])
  const [visible, setVisible] = useState<number>(0)
  const [viewValue, setViewValue] = useState<number>(0)
  const [pageStart, setPageStart] = useState<number>(0)
  const [loadingList, setLoadingList] = useState<boolean>(true)
  const handler = (id: number) => {
    setVisible(id)
  }
  const closeHandler = () => {
    setVisible(0)
    return true
  }

  const loadMore = (page: number) => {
    setList([...list, page])
  }

  const items = (
    <>
      <Grid.Container gap={2} justify='flex-start'>
        {list.map((value) => (
          <Grid xs={6} sm={3} key={value}>
            <Card key={value}>
              <Card.Image
                showSkeleton
                src={`https://www.n-ipgs.jp/upload/save_image/00030249/${('000' + value).slice(
                  -3
                )}.JPG`}
                objectFit='cover'
                width={320}
                height={180}
                alt={`${visible}.jpg`}
                maxDelay={10000}
                onClick={() => handler(value)}
              />
              <Card.Footer css={{ justifyItems: 'flex-start' }}>
                <Row wrap='wrap' justify='space-between' align='center'>
                  <Text b>{value}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </>
  )
  const loader = (
    <Grid.Container justify='center'>
      <Loading size='lg' />
    </Grid.Container>
  )

  setTimeout(() => {
    setLoadingList(false)
  }, 2 * 1000)

  return (
    <>
      <Input
        clearable
        contentRightStyling={false}
        placeholder='見たい写真の番号を入力'
        onChange={(e) => setViewValue(Number(e.target.value))}
        value={viewValue === 0 ? '' : viewValue}
        contentRight={
          <Button
            shadow
            rounded
            flat
            auto
            size={'xs'}
            color={'gradient'}
            onClick={() => setVisible(viewValue)}
          >
            Go
          </Button>
        }
      />
      {loadingList ? (
        <Grid.Container alignItems='center' css={{ maxW: 800, marginTop: 100 }} justify='center'>
          <Loading type='points' size='lg'><Text color='gray'>Now Loading... Created by HRTK92</Text></Loading>
        </Grid.Container>
      ) : (
        <InfiniteScroll
          loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
          hasMore={true} //読み込みを行うかどうかの判定
          loader={loader}
          pageStart={pageStart}
          threshold={700}
        >
          {items} {/* 無限スクロールで表示する項目 */}
        </InfiniteScroll>
      )}
      <Modal
        closeButton
        blur
        aria-labelledby='modal-title'
        open={!(visible === 0)}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            写真
            <Text b size={18}>
              No.{visible}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Image
            showSkeleton
            src={`https://www.n-ipgs.jp/upload/save_image/00030249/${('000' + visible).slice(
              -3
            )}.JPG`}
            objectFit='cover'
            width='full'
            height='full'
            alt={`${visible}.jpg`}
            maxDelay={10000}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bordered auto onClick={() => setVisible(visible - 1)}>
            Back
          </Button>
          <Button bordered color='secondary' auto onClick={() => setVisible(visible + 1)}>
            Next
          </Button>
          <Button auto flat color='error' onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PhotoList
