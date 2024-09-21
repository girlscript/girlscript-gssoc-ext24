// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Certification {
    bytes32 public merkleRootProjectAdmins;
    bytes32 public merkleRootMentors;
    bytes32 public merkleRoot100Contributors;
    bytes32 public merkleRootContributors;
    bytes32 public merkleRootCampusAmbassadors;
    bytes32 public merkleRootOpenSourceAdvocates;
    bytes32 public merkleRootOrganizingTeam;

    constructor(
        bytes32 _merkleRootProjectAdmins,
        bytes32 _merkleRootMentors,
        bytes32 _merkleRoot100Contributors,
        bytes32 _merkleRootContributors,
        bytes32 _merkleRootCampusAmbassadors,
        bytes32 _merkleRootOpenSourceAdvocates,
        bytes32 _merkleRootOrganizingTeam
    ) {
        merkleRootProjectAdmins = _merkleRootProjectAdmins;
        merkleRootMentors = _merkleRootMentors;
        merkleRoot100Contributors = _merkleRoot100Contributors;
        merkleRootContributors = _merkleRootContributors;
        merkleRootCampusAmbassadors = _merkleRootCampusAmbassadors;
        merkleRootOpenSourceAdvocates = _merkleRootOpenSourceAdvocates;
        merkleRootOrganizingTeam = _merkleRootOrganizingTeam;
    }

    function verifyPAs(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRootProjectAdmins,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function verifyMentors(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRootMentors,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function verifyTop100(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRoot100Contributors,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function verifyContributors(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRootContributors,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function verifyCAs(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRootCampusAmbassadors,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function verifyOpenSourceAdvocates(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRootOpenSourceAdvocates,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function verifyOrgTeam(
        bytes32[] calldata merkleProof,
        string memory participant
    ) public view returns (bool) {
        if (
            MerkleProof.verify(
                merkleProof,
                merkleRootOrganizingTeam,
                keccak256(bytes(participant))
            )
        ) {
            return true;
        } else {
            return false;
        }
    }
}
