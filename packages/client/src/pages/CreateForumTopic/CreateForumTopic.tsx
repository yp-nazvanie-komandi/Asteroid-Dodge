import { FC } from 'react'
import { TCreateTopicInputs } from './types'
import { SubmitHandler, useForm } from 'react-hook-form'
import './style.scss'
import { ForumContainer } from '../../components/ForumContainer/ForumContainer'

export const CreateForumTopic: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateTopicInputs>()

  const onSubmit: SubmitHandler<TCreateTopicInputs> = data => {
    console.log(data)
  }

  return (
    <ForumContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="forum-topic-form">
        <h2 className="forum-topic-form__title">Creating your topic</h2>
        <div className="forum-topic-form__field-group">
          <label htmlFor="name" className="forum-topic-form__label">
            Name
          </label>
          <input
            id="name"
            {...register('name', { required: true })}
            className="forum-topic-form__input"
            placeholder="Enter your name"
          />
          {errors.name && (
            <span className="forum-topic-form__error">Name is required</span>
          )}
        </div>

        <div className="forum-topic-form__field-group">
          <label htmlFor="text" className="forum-topic-form__label">
            Topic Text
          </label>
          <textarea
            id="text"
            {...register('text', { required: true })}
            className="forum-topic-form__input"
            placeholder="Enter your topic text"
            rows={5}
          />
          {errors.text && (
            <span className="forum-topic-form__error">Text is required</span>
          )}
        </div>

        <input
          type="submit"
          value="COMMENT"
          className="forum-topic-form__submit"
        />
      </form>
    </ForumContainer>
  )
}
