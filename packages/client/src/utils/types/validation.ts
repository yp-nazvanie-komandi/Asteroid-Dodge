import type { AnySchema } from 'yup'

type TFormField = {
  name: string
  validation: AnySchema
}

export type TFormFieldsSchemas<
  TFormFields extends ReadonlyArray<TFormField> | TFormField[],
> = {
  [TKey in TFormFields[number]['name']]: Extract<
    TFormFields[number],
    { name: TKey }
  >['validation']
}
