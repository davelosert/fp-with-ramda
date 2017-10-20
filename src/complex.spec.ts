import {always, cond, contains, curry, equals, filter, flip, pipe, pluck, sum, T, where} from 'ramda';
import {expect} from 'chai';

const andElse = T;
describe('Complex FP with Ramda', () => {
  const selectedProductIds = [1, 2, 3];
  const products: any[] = [
    { id: 0, price: 3, inStock: false, type: 'sellable' },
	{ id: 1, price: 4, inStock: true, type: 'sellable' }, // applies to all criteria
	{ id: 2, price: 5, inStock: true, type: 'sellable' }, // applies to all criteria
	{ id: 3, price: 2, inStock: true, type: 'deliverable' },
	{ id: 4, price: 5, inStock: true, type: 'deliverable' }
  ];


  const inSelected = flip(contains)(selectedProductIds);
  const isPriceRelevant = where({
	id: inSelected,
	type: equals('sellable'),
	inStock: equals(true)
  });
  const filterPriceRelevantProducts: (products: any[]) => any[] = filter(isPriceRelevant);
  it('only leaves products which have id in selected, have type sellable and have inStock = true', () => {
	const result = filterPriceRelevantProducts(products);
	expect(result).to.have.lengthOf(2)
  });


  const getPrices = pluck('price') as (products: any[]) => number[];
  it('retrieves the price property from all objects in the array', () => {
	const result = getPrices([{price: 2}, {price: 4}]);
	expect(result).to.eql([2, 4]);
  });


  const appendStr = curry((append, price) => `${price} ${append}`);
  const appendDollarTextForPrice = cond([
	[equals(0), always('')],
	[equals(1), appendStr('Dollar')],
	[andElse, appendStr('Dollars')]
  ]);
  it('returns an empty string for 0', () => {
	expect(appendDollarTextForPrice(0)).to.equal('');
  });

  it('returns string "1 dollar" for 1', () => {
	expect(appendDollarTextForPrice(1)).to.equal('1 Dollar');
  });

  it('returns string "4 Dollars" for 4', () => {
	expect(appendDollarTextForPrice(4)).to.equal('4 Dollars');
  });


  const priceSumSelectedProducts = pipe(
	filterPriceRelevantProducts,
	getPrices,
	sum,
	appendDollarTextForPrice
  );

  it('now correctly shows the dollar sign', () => {
	const result = priceSumSelectedProducts(products);
	expect(result).to.equal('9 Dollars');
  });
});