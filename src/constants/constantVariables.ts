import {UseFormMethods} from 'react-hook-form';

export const FORM_OPTIONS = (defaultValues: object): object => ({
  mode: 'all',
  reValidateMode: 'onBlur',
  defaultValues,
  resolver: undefined,
  context: undefined,
  criteriaMode: 'firstError',
  shouldFocusError: true,
  shouldUnregister: true,
});
