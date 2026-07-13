"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors disabled:opacity-40 ${
        active ? "bg-brand text-ink" : "text-muted hover:bg-ink/5 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const addLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Zadajte URL odkazu:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Zadajte URL obrázka:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-line bg-[#fafafa] p-2">
      <ToolbarButton title="Tučné" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton title="Kurzíva" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton title="Prečiarknuté" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
        <Strikethrough size={16} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-line" />

      <ToolbarButton title="Nadpis 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton title="Nadpis 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
        <Heading3 size={16} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-line" />

      <ToolbarButton title="Odrážky" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton title="Číslovaný zoznam" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton title="Citát" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton title="Oddeľovač" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={16} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-line" />

      <ToolbarButton title="Odkaz" onClick={addLink} active={editor.isActive("link")}>
        <LinkIcon size={16} />
      </ToolbarButton>
      <ToolbarButton title="Obrázok" onClick={addImage}>
        <ImageIcon size={16} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-line" />

      <ToolbarButton title="Späť" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton title="Znova" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo2 size={16} />
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Placeholder.configure({ placeholder: "Začnite písať svoj článok…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[420px] px-5 py-4 focus:outline-none prose-headings:font-serif",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="min-h-[480px] rounded-xl border border-line bg-white" />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
