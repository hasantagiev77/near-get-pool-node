const { connect, keyStores } = require('near-api-js');
const path = require('path');
const homedir = require('os').homedir();


const nearAPI = require('near-api-js');

const CREDENTIALS_DIR = '.near-credentials';
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    nodeUrl: 'https://rpc.testnet.near.org',
};

(async function () {
  const near = await connect(config);
  
  const account = await near.account('hasan4.testnet');
  
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
