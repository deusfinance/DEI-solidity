const path = require('path');
const envPath = path.join(__dirname, '../../.env');
require('dotenv').config({ path: envPath });

require('hardhat-deploy');
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
// require("@nomiclabs/hardhat-vyper");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
	const accounts = await ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		// hardhat: {
		// 	forking: {
		// 		url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
		// 		// url: `https://apis.ankr.com/${process.env.ANKR_STRING}`
		// 		// url: 'https://bsc-dataseed.binance.org/'
		// 	},
		// 	accounts: {
		// 		mnemonic: process.env.ROPSTEN_HARDHAT_PHRASE
		// 	},
		// },
		// mainnet: {
		// 	url:`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
		// 	accounts: {
		// 		mnemonic: process.env.MNEMONIC_PHRASE
		// 	},
		// 	chainId: 1,
		// 	gas: "auto",
		// 	gasPrice: 40000000000,
		// 	gasMultiplier: 1.2
		// },
		// bsc_mainnet: {
		// 	url: `https://bsc-dataseed.binance.org/`,
		// 	accounts: {
		// 		mnemonic: process.env.BSC_MNEMONIC_PHRASE
		// 	},
		// 	chainId: 56,
		// 	gas: "auto",
		// 	gasPrice: 15000000000,
		// 	gasMultiplier: 1.2
		// },
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 3,
			gas: "auto",
			minGasPrice: 1000000000,
			initialBaseFeePerGas: 360000000,
			gasPrice: "auto",
			gasMultiplier: 1.2
		},
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 4,
			gas: "auto",
			gasPrice: 3100000000,
			gasMultiplier: 1.2
		},
		mainnet: {
			url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 1,
			gas: "auto",
			gasPrice: 77100000000,
			gasMultiplier: 1.2
		},
		heco: {
			url: "https://http-mainnet.hecochain.com",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 128,
			gas: "auto",
			gasPrice: "auto",
			gasMultiplier: 1.2
		},
		avalanche: {
			url: "https://api.avax.network/ext/bc/C/rpc",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 43114,
			gas: "auto",
			gasPrice: "auto",
			gasMultiplier: 1.2
		},
		fuji: {
			url: "https://api.avax-test.network/ext/bc/C/rpc",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 43113,
			gas: "auto",
			gasPrice: "auto",
			gasMultiplier: 1.2
		},
		polygon: {
			url: "https://polygon-rpc.com/",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 137,
			gas: "auto",
			gasPrice: 36100000000,
			gasMultiplier: 1.2
		},
		fantom: {
			url: "https://rpc.ftm.tools/",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 250,
			gas: "auto",
			gasPrice: 300100000000,	//500.1 Gwei
			gasMultiplier: 1.2
		},
		bsctest: {
			url: "https://data-seed-prebsc-1-s1.binance.org:8545",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 97,
			gas: "auto",
			gasPrice: 10e9,	// 10 Gwei
			gasMultiplier: 1.2
		},
		bsc: {
			url: "https://bsc-dataseed1.ninicoin.io/",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 56,
			gas: "auto",
			gasPrice: 10e9,	// 10 Gwei
			gasMultiplier: 1.2
		},
		metis: {
			url: "https://andromeda.metis.io/?owner=1088",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 1088,
			gas: "auto",
			gasPrice: 23e9,	// 23 Gwei
			gasMultiplier: 1.2
		},
		arbitrum: {
			url: "https://arb1.arbitrum.io/rpc",
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
			chainId: 42161,
			gas: "auto",
			gasPrice: 'auto',
			gasMultiplier: 1.2
		},
		localhostOptimism: {
			url: 'http://127.0.0.1:8547/',
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
		},
		localhostMainnet: {
			url: 'http://127.0.0.1:8545/',
			accounts: [
				process.env.MAIN_DEPLOYER_PRIVATE_KEY,
				process.env.SECOND_DEPLOYER_PRIVATE_KEY,
				process.env.DEI_DEPLOYER_PRIVATE_KEY,
				process.env.DEUS_DEPLOYER_PRIVATE_KEY
			],
		}
	},
	solidity: {
		compilers: [
			{
				version: "0.5.17",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.6.11",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.6.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.7.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.8.0",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.8.4",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.8.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.8.7",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.8.9",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			},
			{
				version: "0.8.10",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				}
			}
		],
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts"
	},
	mocha: {
		timeout: 360000
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY, // ETH Mainnet
		// apiKey: process.env.FANTOM_API_KEY, // FANTOM Mainnet
		// apiKey: process.env.POLYGON_API_KEY, // ETH Mainnet
		// apiKey: process.env.HECO_API_KEY, // HECO Mainnet
		// apiKey: process.env.BSCSCAN_API_KEY // BSC
		// apiKey: process.env.ARBISCAN_API_KEY, // Arbitrum
	},
	contractSizer: {

		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: false,
	},
	vyper: {
		version: "0.2.12"
	},
};
