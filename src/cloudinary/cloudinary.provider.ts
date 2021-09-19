import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dhexix4cn',
      api_key: '249148954171488',
      api_secret: 'N-j-RPxqM0cKxeNwMu2qk2P7dwE',
      // api_secret: process.env.CLD_API_SECRET,
    });
  },
};
