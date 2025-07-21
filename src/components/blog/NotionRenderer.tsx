/* eslint-disable @typescript-eslint/no-explicit-any */

interface NotionRendererProps {
  blocks: any[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  const renderBlock = (block: any) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <p key={id} className="mb-4">
            {value.rich_text.map((text: any, index: number) => (
              <span
                key={index}
                className={`
                  ${text.annotations.bold ? "font-bold" : ""}
                  ${text.annotations.italic ? "italic" : ""}
                  ${text.annotations.strikethrough ? "line-through" : ""}
                  ${text.annotations.underline ? "underline" : ""}
                  ${text.annotations.code ? "bg-gray-100 px-2 py-1 rounded font-mono text-sm" : ""}
                `}
                style={{
                  color: text.annotations.color !== "default" ? text.annotations.color : undefined,
                }}
              >
                {text.href ? (
                  <a
                    href={text.href}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text.plain_text}
                  </a>
                ) : (
                  text.plain_text
                )}
              </span>
            ))}
          </p>
        );

      case "heading_1":
        return (
          <h1 key={id} className="text-3xl font-bold mb-4 mt-8">
            {value.rich_text.map((text: any) => text.plain_text).join("")}
          </h1>
        );

      case "heading_2":
        return (
          <h2 key={id} className="text-2xl font-bold mb-4 mt-6">
            {value.rich_text.map((text: any) => text.plain_text).join("")}
          </h2>
        );

      case "heading_3":
        return (
          <h3 key={id} className="text-xl font-bold mb-3 mt-4">
            {value.rich_text.map((text: any) => text.plain_text).join("")}
          </h3>
        );

      case "bulleted_list_item":
        return (
          <li key={id} className="mb-2">
            {value.rich_text.map((text: any) => text.plain_text).join("")}
          </li>
        );

      case "numbered_list_item":
        return (
          <li key={id} className="mb-2">
            {value.rich_text.map((text: any) => text.plain_text).join("")}
          </li>
        );

      case "code":
        return (
          <pre key={id} className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
            <code className="text-sm">
              {value.rich_text.map((text: any) => text.plain_text).join("")}
            </code>
          </pre>
        );

      case "quote":
        return (
          <blockquote key={id} className="border-l-4 border-primary pl-4 py-2 mb-4 italic bg-gray-50">
            {value.rich_text.map((text: any) => text.plain_text).join("")}
          </blockquote>
        );

      case "divider":
        return <hr key={id} className="my-8 border-gray-300" />;

      case "image":
        const imageUrl = value.type === "external" ? value.external.url : value.file.url;
        return (
          <div key={id} className="my-8">
            <img
              src={imageUrl}
              alt={value.caption?.[0]?.plain_text || ""}
              className="w-full rounded-lg shadow-lg"
            />
            {value.caption && value.caption.length > 0 && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {value.caption.map((text: any) => text.plain_text).join("")}
              </p>
            )}
          </div>
        );

      case "embed":
        return (
          <div key={id} className="my-8">
            <iframe
              src={value.url}
              className="w-full h-96 rounded-lg"
              title="Embedded content"
            />
          </div>
        );

      case "table":
        return (
          <div key={id} className="my-8 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                {/* 테이블 내용은 별도의 table_row 블록으로 처리됨 */}
              </tbody>
            </table>
          </div>
        );

      case "table_row":
        return (
          <tr key={id}>
            {value.cells.map((cell: any, cellIndex: number) => (
              <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                {cell.map((text: any) => text.plain_text).join("")}
              </td>
            ))}
          </tr>
        );

      default:
        return (
          <div key={id} className="mb-4 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              지원되지 않는 블록 타입: {type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="notion-content">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
} 