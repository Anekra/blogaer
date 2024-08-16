import { NextRequest as Res } from 'next/server';

declare interface NextRequest extends Res {
  refreshAt: number;
}
