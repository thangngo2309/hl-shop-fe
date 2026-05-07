'use client'

import { MyCustomUploadAdapterPlugin } from '@/lib/custom-upload-adapter-plugin'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
    FileRepository,
    ClassicEditor,
    Autoformat,
    Bold,
    Italic,
    Underline,
    BlockQuote,
    CloudServices,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    Indent,
    IndentBlock,
    Link,
    List,
    Mention,
    Paragraph,
    PasteFromOffice,
    Table,
    TableColumnResize,
    TableToolbar,
    ImageTextAlternative,
    ImageBlock,
    ImageInline,
    Font,
} from 'ckeditor5'

type CustomEditorProps = {
    onChange: (content: string) => void;
};

function CustomEditor({ onChange }: CustomEditorProps) {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                licenseKey: 'GPL',
                plugins: [
                    FileRepository,
                    MyCustomUploadAdapterPlugin,
                    Autoformat,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageResize,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    ImageInline,
                    ImageBlock,
                    ImageStyle,
                    ImageToolbar,
                    ImageTextAlternative,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    Mention,
                    Paragraph,
                    PasteFromOffice,
                    PictureEditing,
                    Table,
                    TableColumnResize,
                    TableToolbar,
                    Underline,
                    Font,
                ],
                toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable', 'uploadImage', '|', 'heading', '|', 'indent', 'outdent', '|','fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',],
                image: {
                    insert: {
                        type: 'auto',
                        integrations: ['upload']
                    },
                    toolbar: [
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative',
                    ]
                },
            }}
            onChange={(_, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    )
}

export default CustomEditor