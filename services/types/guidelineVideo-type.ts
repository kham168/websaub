export interface GuidelineVideo {
    id: string
    detail: string
    video: string
    status: string
  }
  
  export interface GuidelineVideoResponse {
    status: boolean
    message: string
    data: GuidelineVideo[]
  }