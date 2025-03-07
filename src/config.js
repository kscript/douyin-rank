const {
  AID,
  ANCHOR_ID,
  ROOM_ID
} = Object.assign({
  AID: '6383',
  ANCHOR_ID: '1706895689395140',
  ROOM_ID: '7422072931515206451'
}, process.env)

const list = [
  {
    type: 'popularity',
    url: `https://live.douyin.com/webcast/ranklist/popularity/?aid=${AID}&anchor_id=${ANCHOR_ID}&room_id=${ROOM_ID}`
  },
  {
    type: 'hour',
    url: `https://live.douyin.com/webcast/ranklist/hour_detail/?aid=${AID}&anchor_id=${ANCHOR_ID}&room_id=${ROOM_ID}&ranklist_type=0`
  },
  {
    type: 'hour-new',
    url: `https://live.douyin.com/webcast/ranklist/hour_detail/?aid=${AID}&anchor_id=${ANCHOR_ID}&room_id=${ROOM_ID}&ranklist_type=6`
  },
  {
    type: 'creator-top',
    url: `https://creator.douyin.com/janus/douyin/creator/data/billboard/list?aid=2906&page_num=1&page_size=200&type=10`
  }
]

Object.assign(module.exports,
  Object.assign(exports, {
    list
  })
)
