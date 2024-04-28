require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require ("dotenv").config()
const {API_URL, PRIVATE_KEY} = process.env;

module.exports = {
  solidity: "0.8.24",
  // defaultNetwork: "volta",
  // networks: {
  //   volta: {
  //     url: API_URL,
  //     accounts: [PRIVATE_KEY],
  //     networks_id: 73799,
  //     gas: 210000000,
  //     gasPrice: 800000000000,
  //   }
  // }
};
