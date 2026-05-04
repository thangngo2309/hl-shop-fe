'use client';

import { useState } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import Dashboard from '@uppy/react/dashboard';
import { UploadImageResponse } from '../model/imageresponse.model';
import { UploadImageProps } from '../model/upload.model';
import { getAccessToken } from '@/lib/localstorage';

export default function UploadImage({ type, entityId, onUploadSuccess }: UploadImageProps) {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxFileSize: 10 * 1024 * 1024,
        maxNumberOfFiles: 10,
        allowedFileTypes: ['image/*'],
      },
      allowMultipleUploadBatches: false,
    })
    .use(XHRUpload, {
      endpoint: `http://localhost:3000/images/upload?type=${type}&entity_id=${entityId}`,
      fieldName: 'files',
      bundle: true,
      headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      },
    })
      .on('complete', (result) => {
        if (result.successful && result.successful.length > 0) {
          const response = result.successful[0].response?.body as unknown as UploadImageResponse;
          onUploadSuccess?.(response);
        }
      })
  );

  return <Dashboard uppy={uppy} />;
}