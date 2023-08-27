import React from "react";
import { Container } from "./style.module";
import { useEditor } from "@tiptap/react";
import Editor from "./components/Editor";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Strike from "@tiptap/extension-strike";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontSize from "tiptap-extension-font-size";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import {
  CustomHorizontalRule1,
  CustomHorizontalRule2,
  CustomHorizontalRule3,
  CustomHorizontalRule4,
} from "./components/customExtension/horizontalRule";
import {
  CustomBlockQuote1,
  CustomBlockQuote2,
  CustomBlockQuote3,
  CustomBlockQuote4,
  CustomBlockQuote5,
  CustomBlockQuote6,
  CustomBlockQuote7,
} from "./components/customExtension/blockquote";
import {
  CustomBulletList1,
  CustomBulletList2,
  CustomBulletList3,
} from "./components/customExtension/list";
import ImageResize from "./components/customExtension/imageAlignment";

const WritingPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "list"],
      }),
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize,
      Underline,
      Strike,
      Image,
      Youtube,
      CustomHorizontalRule1,
      CustomHorizontalRule2,
      CustomHorizontalRule3,
      CustomHorizontalRule4,
      CustomBlockQuote1,
      CustomBlockQuote2,
      CustomBlockQuote3,
      CustomBlockQuote4,
      CustomBlockQuote5,
      CustomBlockQuote6,
      CustomBlockQuote7,
      CustomBulletList1,
      CustomBulletList2,
      CustomBulletList3,
      ImageResize,
    ],
    content: "",
  });

  return (
    <Container>
      <Editor editor={editor} />
    </Container>
  );
};

export default WritingPage;
