import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { CreateOfferRequestType } from './create-offer-request.type.js';
import { DetailedOfferRdo } from './rdo/detailed-offer.rdo.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { GetOfferRequestType } from './get-offer-request.type.js';
import { UpdateOfferRequestType } from './update-offer-request.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { DEFAULT_COMMENTS_COUNT, DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumByCity });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetailed,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(DEFAULT_OFFER_COUNT);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(req: CreateOfferRequestType, res: Response): Promise<void> {
    const { body } = req;

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(DetailedOfferRdo, result));
  }

  public async getDetailed(req: GetOfferRequestType, res: Response) {
    const { params: { offerId }} = req;
    const offer = await this.offerService.findById(offerId);
    if (offer) {
      return this.ok(res, fillDTO(DetailedOfferRdo, offer));
    }

    throw new HttpError(
      StatusCodes.NOT_FOUND,
      `Offer with id ${offerId} not found.`,
      'OfferController'
    );
  }

  public async getPremiumByCity(req: GetOfferRequestType, res: Response) {
    const { query: { city } } = req;

    if(typeof city === 'string' && Object.keys(City).includes(city)) {
      const result = await this.offerService.findPremium(
        City[city as keyof typeof City],
        DEFAULT_PREMIUM_OFFER_COUNT
      );
      return this.ok(res, fillDTO(OfferRdo, result));
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `No offers found for city ${city}.`,
      'OfferController'
    );
  }

  public async getFavorites(_req: Request, res: Response) {
    const result = await this.offerService.findFavorite();
    return this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(req: GetOfferRequestType, res: Response) {
    const { params: { offerId }} = req;

    const offer = await this.offerService.deleteById(offerId);
    if (offer) {
      await this.commentService.deleteByOfferId(offerId);

      return this.ok(res, null);
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `No data or access for deleting offer ${offerId}.`,
      'OfferController'
    );
  }

  public async update(req: UpdateOfferRequestType, res: Response) {
    const { params: { offerId }, body } = req;

    if (offerId) {
      const result = await this.offerService.updateById(offerId, body);
      return this.ok(res, fillDTO(DetailedOfferRdo, result));
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Can't update offer ${offerId}.`,
      'OfferController'
    );
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId, DEFAULT_COMMENTS_COUNT);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
