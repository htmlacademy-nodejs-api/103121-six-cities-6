import { Middleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { OfferService } from '../../../modules/offer/offer-service.interface.js';

export class ValidUserMiddleware implements Middleware {
  constructor(
    private readonly offerService: OfferService,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    if (offer?.userId.toString() !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'You are not allowed to do anything with this offer.',
        'OfferController'
      );
    }

    next();
  }
}
