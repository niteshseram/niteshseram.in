import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { type NextRequest, NextResponse } from 'next/server';

const { rewrite: rewriteMdx } = rewritePath(
  '/writing{/*path}.mdx',
  '/llms.mdx{/*path}',
);
const { rewrite: rewriteLLM } = rewritePath(
  '/writing/*path',
  '/llms.mdx/*path',
);

export default function proxy(request: NextRequest) {
  const mdxResult = rewriteMdx(request.nextUrl.pathname);
  if (mdxResult) {
    return NextResponse.rewrite(new URL(mdxResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const llmResult = rewriteLLM(request.nextUrl.pathname);
    if (llmResult) {
      return NextResponse.rewrite(new URL(llmResult, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/writing/:path*',
};
