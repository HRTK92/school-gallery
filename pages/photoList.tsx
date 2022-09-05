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
  const [pageStart, setPageStart] = useState<number>(0)
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
                alt='Card image background'
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
      <Loading size='md' />
    </Grid.Container>
  )

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
        hasMore={true} //読み込みを行うかどうかの判定
        loader={loader}
        pageStart={pageStart}
      >
        {' '}
        {/* 読み込み最中に表示する項目 */}
        {items} {/* 無限スクロールで表示する項目 */}
      </InfiniteScroll>
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
            alt='Card image background'
            maxDelay={10000}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={() => setVisible(visible - 1)}>
            Back
          </Button>
          <Button auto onClick={() => setVisible(visible + 1)}>
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
