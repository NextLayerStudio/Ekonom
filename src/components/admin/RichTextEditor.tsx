"use client";

import { useRef, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { uploadImage } from "@/lib/upload-client";

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

function Toolbar({
  editor,
  onUploadingChange,
}: {
  editor: Editor;
  onUploadingChange: (v: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

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

  const onImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    onUploadingChange(true);
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Nahrávanie zlyhalo.");
    } finally {
      onUploadingChange(false);
    }
  };

  return (
    <>
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
        <ToolbarButton title="Nahrať obrázok" onClick={() => fileRef.current?.click()}>
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

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onImageFile}
      />
    </>
  );
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

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
    <div className="relative overflow-hidden rounded-xl border border-line bg-white">
      <Toolbar editor={editor} onUploadingChange={setUploading} />
      <EditorContent editor={editor} />
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <Loader2 size={28} className="animate-spin text-muted" />
        </div>
      )}
    </div>
  );
}
