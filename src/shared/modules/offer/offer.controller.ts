import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequestType } from './create-offer-request.type.js';
import { DetailedOfferRdo } from './rdo/detailed-offer.rdo.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { GetOfferRequestType } from './get-offer-request.type.js';
import { UpdateOfferRequestType } from './update-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumByCity });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.getDetailed });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:id', method: HttpMethod.Put, handler: this.update });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(req: CreateOfferRequestType, res: Response): Promise<void> {
    const { body} = req;

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(DetailedOfferRdo, result));
  }

  public async getDetailed(req: GetOfferRequestType, res: Response) {
    const { params: { id }} = req;
    const offer = await this.offerService.findById(id);
    if (offer) {
      return this.ok(res, fillDTO(DetailedOfferRdo, offer));
    }

    throw new HttpError(
      StatusCodes.NOT_FOUND,
      `Offer with id ${id} not found.`,
      'OfferController'
    );
  }

  public async getPremiumByCity(req: GetOfferRequestType, res: Response) {
    const { query: { city } } = req;

    if(typeof city === 'string' && Object.keys(City).includes(city)) {
      const result = await this.offerService.findPremium(City[city as keyof typeof City]);
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
    const { params: { id }} = req;

    const offer = await this.offerService.deleteById(id);
    if (offer) {
      return this.ok(res, null);
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `No data or access for deleting offer ${id}.`,
      'OfferController'
    );
  }

  public async update(req: UpdateOfferRequestType, res: Response) {
    const { params: { id }, body } = req;


    if (id) {
      const result = await this.offerService.updateById(id, body);
      return this.ok(res, fillDTO(DetailedOfferRdo, result));
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Can't update offer ${id}.`,
      'OfferController'
    );
  }
}
