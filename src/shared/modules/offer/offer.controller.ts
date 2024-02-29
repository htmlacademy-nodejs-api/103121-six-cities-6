import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
  ValidUserMiddleware,
  UploadFileMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component, ControllerPath } from '../../types/index.js';
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
import {
  DEFAULT_COMMENTS_COUNT,
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT
} from './offer.constant.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UploadImageRdo } from './rdo/upload-image.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto, ControllerPath.Offer)
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumByCity,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetailed,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidUserMiddleware(this.offerService),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto, ControllerPath.Offer),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidUserMiddleware(this.offerService),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(DEFAULT_OFFER_COUNT, tokenPayload.id);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(req: CreateOfferRequestType, res: Response): Promise<void> {
    const { body, tokenPayload } = req;

    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(DetailedOfferRdo, result));
  }

  public async getDetailed(req: GetOfferRequestType, res: Response) {
    const { params: { offerId }, tokenPayload } = req;
    const offer = await this.offerService.findById(offerId, tokenPayload.id);
    return this.ok(res, fillDTO(DetailedOfferRdo, offer));
  }

  public async getPremiumByCity(req: GetOfferRequestType, res: Response) {
    const { query: { city }, tokenPayload } = req;

    if(typeof city === 'string' && Object.keys(City).includes(city)) {
      const result = await this.offerService.findPremium(
        City[city as keyof typeof City],
        DEFAULT_PREMIUM_OFFER_COUNT,
        tokenPayload.id
      );
      return this.ok(res, fillDTO(OfferRdo, result));
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `No offers found for city ${city}.`,
      'OfferController'
    );
  }

  public async getFavorites({ tokenPayload }: Request, res: Response) {
    const result = await this.offerService.findFavorite(tokenPayload.id);
    return this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(req: GetOfferRequestType, res: Response) {
    const { params: { offerId }, tokenPayload } = req;

    await this.offerService.deleteById(offerId, tokenPayload.id);
    await this.commentService.deleteByOfferId(offerId);
    return this.ok(res, null);
  }

  public async update(req: UpdateOfferRequestType, res: Response) {
    const { params: { offerId }, body, tokenPayload } = req;

    const result = await this.offerService.updateById(offerId, body, tokenPayload.id);
    return this.ok(res, fillDTO(DetailedOfferRdo, result));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId, DEFAULT_COMMENTS_COUNT);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async uploadImage({ params, file, tokenPayload } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto, tokenPayload.id);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }
}
