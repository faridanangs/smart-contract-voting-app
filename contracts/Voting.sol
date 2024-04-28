// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candiNames, uint256 _durationMinutes) {
        for (uint i = 0; i < _candiNames.length; i++) {
            candidates.push(Candidate({name: _candiNames[i], voteCount: 0}));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationMinutes * 1 minutes);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "hanya owner yang bisa membuat candidat");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({name: _name, voteCount: 0}));
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "kamu sudah vote");
        require(_candidateIndex < candidates.length, "kandidat tidak ada");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getReminingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "voting belum di mulai");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }

    function message() public pure returns (string memory){
        return "tesss gblok";
    }
}
