import { FormProvider, FieldValues} from 'react-hook-form';
import { FormProps } from '@/model/form.model';

export function Form<T extends FieldValues>({ children, onSubmit, methods, error }: FormProps<T>)  {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </form>
    </FormProvider>
  );
}