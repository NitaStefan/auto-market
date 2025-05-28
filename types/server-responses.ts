type ServiceError = {
  success: false
  message: string
}

export type AddCarResult = { success: true; carId: number } | ServiceError

export type SimpleResult = { success: true } | ServiceError

export type GetAndDeleteFacebookPostDataResult =
  | {
      success: true
      postId: string
      mediaIds: string[]
    }
  | ServiceError

export type GetFacebookPostIdResult =
  | { success: true; postId: string }
  | ServiceError

export type MakeFacebookPostResult =
  | { success: true; postId: string; mediaIds: string[] }
  | ServiceError
