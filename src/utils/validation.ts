export const validation = (t: any, comment?: boolean) => ({
  email: {
    required: {
      value: true,
      message: t('validation:required', {
        fieldName: t('inputs:email'),
      }),
    },
    pattern: {
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: t('validation:emailFormat'),
    },
  },
  password: {
    required: {
      value: true,
      message: t('validation:required', {fieldName: t('inputs:password')}),
    },
    minLength: {
      value: 6,
      message: t('validation:minLength', {
        fieldName: t('inputs:password'),
        minLength: 6,
      }),
    },
  },
  phone: {
    required: {
      value: true,
      message: t('validation:required', {fieldName: t('inputs:telephone')}),
    },
  },
  name: {
    required: {
      value: true,
      message: t('validation:required', {
        fieldName: comment ? t('inputs:reviewComment') : t('inputs:name'),
      }),
    },
    minLength: {
      value: 2,
      message: t('validation:minLength', {
        fieldName: comment ? t('inputs:reviewComment') : t('inputs:name'),
        minLength: 2,
      }),
    },
  },
  securityCode: {
    required: {
      value: true,
      message: t('validation:required', {fieldName: ''}),
    },
    minLength: {
      value: 6,
      message: t('validation:minLength', {fieldName: '', minLength: 6}),
    },
  },
  code: {
    required: {
      value: true,
      message: t('validation:required', {fieldName: ''}),
    },
    minLength: {
      value: 4,
      message: t('validation:minLength', {fieldName: '', minLength: 4}),
    },
  },
});
