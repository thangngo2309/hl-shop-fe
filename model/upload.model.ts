import { ImageType } from '../constants/image-type.enum';
import { UploadImageResponse } from './imageresponse.model';

export interface UploadImageProps {
  type: ImageType;
  entityId: number;
  onUploadSuccess?: (response: UploadImageResponse) => void;
}