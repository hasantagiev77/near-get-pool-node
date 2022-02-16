const { connect, keyStores } = require('near-api-js');
const path = require('path');
const homedir = require('os').homedir();


const nearAPI = require('near-api-js');

const CREDENTIALS_DIR = '.near-credentials';
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: 'ref-finance-101.testnet',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
    indexerUrl: 'https://indexer.ref-finance.net',
    sodakiApiUrl: 'https://sodaki.com/api',
    blackList: ['1371#3'],
    REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
    WRAP_NEAR_CONTRACT_ID: 'wrap.near',
    REF_ADBOARD_CONTRACT_ID: 'ref-adboard.near',
    REF_FARM_CONTRACT_ID: 'v2.ref-farming.near',
    REF_TOKEN_ID: 'token.v2.ref-finance.near',
    XREF_TOKEN_ID: 'xtoken.ref-finance.near',
    REF_AIRDROP_CONTRACT_ID: 's01.ref-airdrop.near',
    TOP_POOLS_TOKEN_REFRESH_INTERVAL: 60,
    POOL_TOKEN_REFRESH_INTERVAL: 20,
    STABLE_POOL_ID: 1910,
    STABLE_TOKEN_IDS: [
        'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
        'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near',
        '6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near',
    ],
    STABLE_TOKEN_INDEX: {
        'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near': 0,
        'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near': 1,
        '6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near': 2,
    },
    TOTAL_PLATFORM_FEE_REVENUE: '242,633.0475',
};

(async function () {
  const near = await connect({ ...config, keyStore });
  
  const account = await near.account('hasan4.testnet');
  
  const contract = new nearAPI.Contract(
    account,
    'ref-finance-101.testnet',
    {
      viewMethods: ['get_pool'],
      sender: account,
    }
  );
  contract.get_pool({ pool_id: 17 }).then(pool => {
    console.log(pool);
  });
}())
