import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

export default function GoogleLoginBtn() {
  return (
    <form>
      <button type="submit" className="hv-bright">
        <Icon icon="uim:google" className="text-4xl text-primary-foreground" />
      </button>
    </form>
  );
}
