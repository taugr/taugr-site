import type { APIContext } from 'astro';
import { createLlmsFullTxt } from '../llms';

export async function GET(context: APIContext) {
  return createLlmsFullTxt(context);
}
