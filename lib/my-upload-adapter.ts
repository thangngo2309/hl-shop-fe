import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { UploadAdapter, type FileLoader } from 'ckeditor5';
import { getAccessToken } from './localstorage';
import { UploadImageResponse } from '@/model/imageresponse.model';

export class MyUploadAdapter implements UploadAdapter {
    private loader: FileLoader
    private uppy: Uppy

    constructor(loader: FileLoader) {
        this.loader = loader
        this.uppy = new Uppy({
            restrictions: {
                maxFileSize: 10 * 1024 * 1024,
                allowedFileTypes: ['image/*'],
            },
            autoProceed: true,
        }).use(XHRUpload, {
            endpoint: `${process.env.NEXT_PUBLIC_UPLOAD_IMAGE_INFO}`,
            fieldName: 'files',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
    }

    upload() {
        return this.loader.file
            .then(file => new Promise<{ default: string }>((resolve, reject) => {
                this.uppy.addFile({
                    name: file!.name,
                    type: file!.type,
                    data: file!,
                })

                this.uppy.on('complete', (result) => {
                    if (result.successful && result.successful.length > 0) {
                        const response = result.successful[0].response?.body as unknown as {
                            succeeded: UploadImageResponse[];
                            failed: unknown[];
                        };
                        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${response.succeeded[0].storage_path}`;
                        resolve({
                            default: imageUrl,
                        });
                    }
                })

                this.uppy.upload().catch(err => {
                    console.error('Upload error:', err);
                    reject(err);
                });
            }))
    }

    abort() {
        this.uppy.cancelAll();
    }
}
