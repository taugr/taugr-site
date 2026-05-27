import type { APIContext } from 'astro';
import { createLlmsTxt } from '../llms';

export async function GET(context: APIContext) {
  return createLlmsTxt(context);
}
