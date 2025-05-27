type ServiceError = {
  success: false
  message: string
}

export type AddCarResult = { success: true; carId: number } | ServiceError

export type AddFacebookPostDataResult = { success: true } | ServiceError

//TODO: Check the types from below

export type UpdateCarResult = { success: true } | ServiceError

export type DeleteCarResult = { success: true } | ServiceError

export type GetAndDeleteFacebookPostDataResult =
  | {
      success: true
      postId: string
      mediaIds: string[]
    }
  | ServiceError
