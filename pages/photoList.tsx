import {
  Button,
  Card,
  Grid,
  Image,
  Input,
  Loading,
  Modal,
  Pagination,
  Radio,
  Row,
  Text,
} from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

const PhotoList: NextPage = () => {
  const router = useRouter()

  if (typeof window === 'object') {
    document.oncontextmenu = function () {
      return false
    }
  }
  const [lists, setlists] = useState<Array<number>>([])
  const [showImage, setshowImage] = useState<number>(0)
  const [viewValue, setViewValue] = useState<number>(0)
  const [pageStart, setPageStart] = useState<number>(0)
  const [viewPage, setViewPage] = useState<number>(1)

  const [loadingList, setLoadingList] = useState<boolean>(true)
  const [showType, setShowType] = useState('scroll') //<'scroll' | 'page'>('page')
  const loadMore = (page: number) => {
    setlists([...lists, page])
  }
  const items = (
    <>
      <Grid.Container gap={2} justify='flex-start'>
        {lists.map((value) => (
          <Grid xs={6} sm={3} key={value}>
            <Card key={value}>
              <Card.Image
                showSkeleton
                src={`https://www.n-ipgs.jp/upload/save_image/${router.query.id}/${(
                  '000' + value
                ).slice(-3)}.JPG`}
                objectFit='cover'
                width={320}
                height={180}
                alt={`${showImage}.jpg`}
                maxDelay={10000}
                onClick={() => setshowImage(value)}
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

  if (!(typeof router.query.id === 'string')) {
    return <>404</>
  }

  return (
    <>
      <Grid.Container css={{ margin: 10 }}>
        <Input
          clearable
          contentRightStyling={false}
          placeholder='見たい写真の番号を入力'
          onChange={(e) => setViewValue(Number(e.target.value))}
          value={viewValue === 0 ? '' : viewValue}
          type='number'
          contentRight={
            <Button
              shadow
              rounded
              flat
              auto
              size={'xs'}
              color={'gradient'}
              onClick={() => setshowImage(viewValue)}
            >
              Go
            </Button>
          }
        />
        <Radio.Group
          value={showType}
          onChange={(val) => {
            setlists([])
            setShowType(val)
            if (val === 'page') {
              setlists(Array.from({length:19},(v,k)=>k+1))
            }
          }}
          orientation='horizontal'
          label='表示形式'
          defaultValue='scroll'
        >
          <Radio value='scroll'>Scroll</Radio>
          <Radio value='page'>Page</Radio>
        </Radio.Group>
      </Grid.Container>
      {loadingList ? (
        <Grid.Container alignItems='center' css={{ maxW: 800, marginTop: 100 }} justify='center'>
          <Loading type='points' size='lg'>
            <Text color='gray'>Now Loading... Created by HRTK92</Text>
          </Loading>
        </Grid.Container>
      ) : (
        <>
          {showType === 'scroll' && (
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
          {showType === 'page' && (
            <>
              <Pagination
                shadow
                total={30}
                initialPage={1}
                onChange={(page) =>
                  setlists(
                    Array((page * 20) - ((page - 1) * 20))
                      .fill(1)
                      .map((_, idx) => (page - 1) * 20 + idx)
                  )
                }
              />
              {items}
            </>
          )}
        </>
      )}
      <Modal
        closeButton
        blur
        aria-labelledby='modal-title'
        open={!(showImage === 0)}
        onClose={() => setshowImage(0)}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            写真
            <Text b size={18}>
              No.{showImage}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Image
            showSkeleton
            src={`https://www.n-ipgs.jp/upload/save_image/${router.query.id}/${(
              '000' + showImage
            ).slice(-3)}.JPG`}
            objectFit='cover'
            width='full'
            height='full'
            alt={`${showImage}.jpg`}
            maxDelay={10000}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bordered auto onClick={() => setshowImage(showImage - 1)}>
            Back
          </Button>
          <Button bordered color='secondary' auto onClick={() => setshowImage(showImage + 1)}>
            Next
          </Button>
          <Button auto flat color='error' onClick={() => setshowImage(0)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PhotoList
