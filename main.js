const { connect } = require('near-api-js');


const nearAPI = require('near-api-js');

const config = {
    keyStore: {},
    nodeUrl: 'https://rpc.testnet.near.org',
};

(async function () {
  const near = await connect(config);
  
  const account = await near.account();
  
  const contract = new nearAPI.Contract(
    account,
    'ref-finance-101.testnet',
    {
      viewMethods: ['get_pool'],
      sender: account,
    }
  );

  const poolId = +process.argv[2];

  contract.get_pool({ pool_id: poolId }).then(pool => {
    console.log(pool);
  });
}())
