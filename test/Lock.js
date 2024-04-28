const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  async function deployCreateCandidate() {
    const candidates = ["usman", "raka"];
    const durationTimeSecnd = 10;
    const votingStart = Math.floor(Date.now() / 1000);
    const votingEnd = votingStart + durationTimeSecnd * 60;
    const [account, anotherAcount] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(candidates, durationTimeSecnd);
    console.log(votingEnd - votingStart);
    return {
      voting,
      candidates,
      votingEnd,
      votingStart,
      account,
      anotherAcount,
    };
  }

  describe("test contract", () => {
    it("check candidat", async () => {
      const { voting, candidates } = await loadFixture(deployCreateCandidate);

      const allCandidats = await voting.getAllVotesOfCandidates();
      const candidatename = allCandidats.map((e) => e.name);
      expect(candidatename).to.eql(candidates);
    });
    it("memvalidasi bahwa ini owner", async () => {
      const { voting, account } = await loadFixture(deployCreateCandidate);
      expect(await voting.owner()).to.equal(account);
    });
    it("membuat candidat baru", async () => {
      const { voting, anotherAcount } = await loadFixture(
        deployCreateCandidate
      );

      await expect(
        voting.connect(anotherAcount).addCandidate("farid")
      ).to.be.revertedWith("hanya owner yang bisa membuat candidat");
      await voting.addCandidate("farid");

      const allCandidats = await voting.getAllVotesOfCandidates();
      const candidatename = allCandidats.map((e) => e.name);
      expect(candidatename).to.eql(["usman", "raka", "farid"]);
    });
    it("memberikan suara", async () => {
      const { voting, anotherAcount } = await loadFixture(
        deployCreateCandidate
      );
      await expect(voting.vote(2)).to.be.revertedWith("kandidat tidak ada");

      await voting.vote(1);
      await expect(voting.vote(1)).to.be.revertedWith("kamu sudah vote");

      await voting.connect(anotherAcount).vote(1);
    });

    it("apakah waktu di muali sama", async () => {
      const { voting, votingStart } = await loadFixture(deployCreateCandidate);
      expect(await voting.votingStart()).to.equal(votingStart);
    });
    it("apakah waktu berakhirnya sama", async () => {
      const { voting, votingEnd } = await loadFixture(deployCreateCandidate);
      expect(await voting.votingEnd()).to.equal(votingEnd);
    });
    it("test waktu voting berakhir", async () => {
      const { voting } = await loadFixture(deployCreateCandidate);

      expect(await voting.getReminingTime()).to.equal(600);
    });
    it("test message", async () => {
      const { voting } = await loadFixture(deployCreateCandidate);
      expect(await voting.message()).to.equal("tesss gblok");
    });
  });
});
