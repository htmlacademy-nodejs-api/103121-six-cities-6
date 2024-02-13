import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateOfferDto } from './index.js';

export type CreateOfferRequestType = Request<RequestParams, RequestBody, CreateOfferDto>;
