import {filter, map, pipe} from 'ramda';
import {expect} from 'chai';

describe('Simple FP', () => {
  it('uses all common iterator functions equally', () => {
	const data = [1, 2, 3];

	const resultOld = data.map((num: number) => `Test${num}`);
	const resultNew = map((num: number) => `Test${num}`)(data);

	expect(resultOld).to.eql(resultNew);
  });

  const prependTestForAll = map((num: number) => `Test${num}`);
  it('functions can be prepared before using with ramda', () => {
	const result = prependTestForAll([1, 2, 3]);
	expect(result).to.eql(['Test1', 'Test2', 'Test3']);
  });

  const isEven = num => num % 2 === 0;
  const filterEven = filter(isEven);
  // NOW COMPOSE IT:
  const prependTestForEven = pipe(filterEven, prependTestForAll);

  it('function can be composed', () => {
	const result = prependTestForEven([1, 2, 4]);

	expect(result).to.eql(['Test2', 'Test4']);
  });
});