import { constants } from '@/lib/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { FieldError } from 'react-hook-form';

export default function FormIndicator({
  fieldError,
  value
}: {
  fieldError: FieldError | undefined;
  value: string;
}) {
  if (fieldError?.message) {
    return (
      <Icon
        icon="fa-solid:exclamation"
        className={`${
          fieldError.message === constants.PASS_MINIMUM ? 'text-red-500' : ''
        } ${
          fieldError.message === constants.PASS_WEAK ? 'text-yellow-500' : ''
        } w-5 text-center text-lg text-red-500`}
      />
    );
  } else if (!fieldError && value) {
    return (
      <Icon
        icon="mingcute:check-fill"
        className="w-5 text-center text-lg text-green-500"
      />
    );
  }
}
