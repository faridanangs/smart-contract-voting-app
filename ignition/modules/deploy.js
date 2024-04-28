// const {ethers} = require("@nomicfoundation/hardhat-toolbox");
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// async function main() {
//   const Voting = ethers.getContractFactory("Voting");

//   const voting = await Voting.deploy(["usman", "raska", "dowo"], 30);
//   console.log(
//     "Contarct address:",
//     await voting.then(async (e) => await e.getAddress())
//   );
// }
// main()
//   .then(() => (process.exit = 0))
//   .catch((err) => {
//     console.error(err);
//     process.exit = 1;
//   });

module.exports = buildModule("VotingModule", (m) => {
    const candodates = ["usman", "raska", "dowo"]
  const voting = m.contract("Voting", [candodates, 30]);

  console.log(voting);

  return { voting };
});
