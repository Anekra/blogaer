import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import loginWithGoogle from '../actions/loginWithGoogle';

export default function GoogleLoginBtn() {
  return (
    <form action={loginWithGoogle}>
      <button type="submit" className="hv-bright">
        <Icon icon="uim:google" className="text-4xl text-primary-foreground" />
      </button>
    </form>
  );
}
