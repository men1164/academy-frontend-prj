export interface UserDTO {
  id: number
  username: string
  name: string
  registeredAt: string
}

export interface LoginDTO {
  username: string
  password: string
}

export interface RegisterDTO {
  username: string
  password: string
  name: string
}

export interface CredentialDTO {
  accessToken: string
}

export interface ContentDTO {
  id: number
  videoTitle: string
  videoUrl: string
  comment: string
  rating: number
  thumbnailUrl: string
  creatorName: string
  creatorUrl: string
  postedBy: UserDTO
  createdAt: string
  updatedAt: string
}

export interface ContentsDTO {
  data: ContentDTO[]
}

export interface ErrorDTO {
  statusCode: number
  message: string
  error: string
}

export interface CreateContentDTO {
  videoUrl: string
  comment: string
  rating: number
}

export interface UpdateContentDTO {
  comment: string
  rating: number
}
