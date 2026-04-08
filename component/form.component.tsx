import {useForm, FormProvider, SubmitHandler, FieldValues} from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  methods: ReturnType<typeof useForm<T>>;
}

export function Form<T extends FieldValues>({ children, onSubmit, methods }: FormProps<T>)  {

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}