import { FC } from 'react'
import { TCommentInput, TTopicTextAreaInput } from './types'
import { SubmitHandler, useForm } from 'react-hook-form'
import './styled.scss'

export const TopicTextAreaInput: FC<TTopicTextAreaInput> = ({
  submitCallback,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentInput>()
  const onSubmit: SubmitHandler<TCommentInput> = data => submitCallback(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment-input">
      <textarea
        {...register('comment', { required: true })}
        className="comment-input__field"
        placeholder="Введите комментарий..."
        rows={4}
      />
      {errors.comment && <span>This field is required</span>}
      <input
        type="submit"
        value="COMMENT"
        className="comment-input__submit-button"
      />
    </form>
  )
}
