// Last 5 digits of the current timestamp are used to bust the cache
import { ASSETS_MOUNT_POINT, CACHE_BUSTER } from './constants.js';

export const cssFile = `/${ASSETS_MOUNT_POINT}/css/style.css?_=${CACHE_BUSTER}`;
export const jsFile = `/${ASSETS_MOUNT_POINT}/js/app.js?_=${CACHE_BUSTER}`;
