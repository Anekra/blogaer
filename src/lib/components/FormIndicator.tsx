import { PASS_CHECK } from '@/lib/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { FieldError } from 'react-hook-form';

export default function FormIndicator({
  fieldError,
  value,
  formType
}: {
  fieldError: FieldError | undefined;
  value: string;
  formType: string;
}) {
  if (fieldError?.message) {
    return (
      <Icon
        icon="fa-solid:exclamation"
        className={`${
          fieldError.message === PASS_CHECK.PASS_MINIMUM ? 'text-red-500' : ''
        } ${
          fieldError.message === PASS_CHECK.PASS_WEAK ? 'text-yellow-500' : ''
        } w-5 text-center text-lg text-red-500`}
      />
    );
  } else if (!fieldError && value && formType === 'register') {
    return (
      <Icon
        icon="mingcute:check-fill"
        className="w-5 text-center text-lg text-green-500"
      />
    );
  }
}
