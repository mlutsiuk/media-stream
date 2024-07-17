import type { ZodType, z } from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { TForm } from '#components'

export function useForm<T extends ZodType<any, any>>(options: {
  schema: T
  form: Ref<InstanceType<typeof TForm> | null>
  onSubmit: (event: FormSubmitEvent<z.infer<T>>) => void
}) {
  return {
    clear: () => options.form.value?.clear(),
    submit: () => options.form.value?.submit(),
    setErrors: (errors: FormError[], path?: string) => options.form.value?.setErrors(errors, path),
    getErrors: (path?: string) => options.form.value?.getErrors(path),
    schema: options.schema,
    onSubmit: options.onSubmit
  }
}
