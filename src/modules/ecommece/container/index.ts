import { container } from 'tsyringe';

import ICategoryRepository from '@modules/ecommece/repositories/ICategoryRepository';
import CategoryRepository from '@modules/ecommece/infra/mongo/repositories/CategoryRepository';

import IPriceTableRepository from '@modules/ecommece/repositories/IPriceTableRepository';
import PriceTableRepository from '@modules/ecommece/infra/mongo/repositories/PriceTableRepository';
import ICounterRepository from '@modules/ecommece/repositories/ICounterRepository';
import CounterRepository from '@modules/ecommece/infra/mongo/repositories/CounterRepository';

import IProductRepository from '@modules/ecommece/repositories/IProductRepository';
import ProductRepository from '@modules/ecommece/infra/mongo/repositories/ProductRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IPriceTableRepository>(
  'PriceTableRepository',
  PriceTableRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<ICounterRepository>('CounterRepository', CounterRepository);
