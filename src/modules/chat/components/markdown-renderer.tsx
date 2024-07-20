import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import rehypeSanitize from "rehype-sanitize";

function MarkdownRenderer({markdown}: {markdown: string}) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeKatex, rehypeSanitize]} remarkPlugins={[remarkMath]}>
      {markdown}
    </ReactMarkdown>
  );
}

export {MarkdownRenderer};
