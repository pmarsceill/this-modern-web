type TrackType = {
  album: {
    name: string
    images: [
      {
        url: string
        height: number
        width: number
      }
    ]
  }
  artists: [
    {
      name: string
    }
  ]
  name: string
  id: string
  played_at: string
}

export default TrackType
