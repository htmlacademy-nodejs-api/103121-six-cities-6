import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { DetailedOfferRdo } from './rdo/detailed-offer.rdo.js';

export type GetOfferRequestType = Request<RequestParams, RequestBody, DetailedOfferRdo>;
