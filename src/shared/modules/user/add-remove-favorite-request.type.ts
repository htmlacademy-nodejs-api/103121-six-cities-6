import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { AddRemoveFavoriteDto } from './dto/add-favorite.dto.js';
export type AddRemoveFavoriteRequest = Request<RequestParams, RequestBody, AddRemoveFavoriteDto>;
