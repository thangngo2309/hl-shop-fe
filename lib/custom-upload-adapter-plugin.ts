import { MyUploadAdapter } from "./my-upload-adapter";
import { Editor } from 'ckeditor5';

export function MyCustomUploadAdapterPlugin(editor: Editor): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}