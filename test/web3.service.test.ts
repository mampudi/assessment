import { getEstimatedGas,  GetTransactions, setTotalBaseGasPrice, setTotalBaseTransations} from '../src/service/FeeEstimate.service';
var assert = require('assert');

describe('Given the total gas is 10 ', function () {
  describe('when transaction count is 1 then', function () {
    it('then estimate should return 10', async function () {
        await setTotalBaseGasPrice(10);
        await setTotalBaseTransations(1);
        var response = await getEstimatedGas();

      assert.equal(10, response.feeEstimate);
    });
  });
});

describe('Given the total gas is 20 ', function () {
    describe('when transaction count is 2 then', function () {
      it('then estimate should return 10', async function () {
          await setTotalBaseGasPrice(20);
          await setTotalBaseTransations(2);
          var response = await getEstimatedGas();
  
        assert.equal(10, response.feeEstimate);
      });
    });
  });

  describe('Given the total gas is 20 ', function () {
    describe('when transaction count is 4 then', function () {
      it('then estimate should return 5', async function () {
          await setTotalBaseGasPrice(20);
          await setTotalBaseTransations(4);
          var response = await getEstimatedGas();
  
        assert.equal(5, response.feeEstimate);
      });
    });
  });

  describe('Given the total gas is 10000000064 ', function () {
    describe('when transaction count is 8 then', function () {
      it('then estimate should return 1250000008', async function () {
          await setTotalBaseGasPrice(10000000064);
          await setTotalBaseTransations(8);
          var response = await getEstimatedGas();
  
        assert.equal(1250000008, response.feeEstimate);
      });
    });
  });