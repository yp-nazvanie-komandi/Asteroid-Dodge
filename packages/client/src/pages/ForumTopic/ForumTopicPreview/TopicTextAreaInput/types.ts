export type TTopicTextAreaInput = {
  submitCallback: (form: { comment: string }) => Promise<void>
}

export type TCommentInput = {
  comment: string
}
