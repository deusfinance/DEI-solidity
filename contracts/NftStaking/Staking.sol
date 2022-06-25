// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./MasterChefV2.sol";
import "./MintableToken.sol";

contract Staking is AccessControl {
    struct UserDeposit {
        uint256 nftId;
        uint256 amount;
        uint256 depositTimestamp;
    }

    struct Pool {
        uint256 poolId;
        address token;
        uint256 lockDuration;
    }

    address public nft;
    address public masterChef;

    // pool id => user address => user deposits
    mapping(uint256 => mapping(address => UserDeposit[])) public userDeposits;
    mapping(uint256 => mapping(address => uint256))
        public validUserDepositIndex;

    // pool id => pool
    mapping(uint256 => Pool) public pools;

    bytes32 public constant SETTER_ROLE = keccak256("SETTER_ROLE");
    bytes32 public constant POOL_MANAGER_ROLE = keccak256("POOL_MANAGER_ROLE");

    modifier whenEmrgency {
        require(isEmergency, "");
        _;
    }

    constructor(
        address nft_,
        address masterChef_,
        address setter,
        address poolManager,
        address admin
    ) public {
        nft = nft_;
        masterChef = masterChef_;

        _setupRole(SETTER_ROLE, setter);
        _setupRole(POOL_MANAGER_ROLE, poolManager);
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function setNft(address nft_) external onlyRole(SETTER_ROLE) {
        nft = nft_;
    }

    function setMasterChef(address masterChef_) external onlyRole(SETTER_ROLE) {
        masterChef = masterChef_;
    }

    function setPool(
        uint256 poolId,
        address token,
        uint256 lockDuration
    ) external only(POOL_MANAGER_ROLE) {
        pools[poolId] = Pool({
            poolId: poolId,
            token: token,
            lockDuration: lockDuration
        });
    }

    // todo impelemnt this function
    function getNftValue(uint256 nftId) public view returns (uint256 value) {
        value = 100e18;
        return value;
    }

    function deposit(
        uint256 poolId,
        uint256 nftId,
        address to
    ) public {
        IERC721(nft).safeTransferFrom(msg.sender, address(this), nftId);

        uint256 amount = getNftValue(nftId);

        userDeposits[poolId][to].push(
            UserDeposit({
                nftId: nftId,
                amount: amount,
                depositTimestamp: block.timestamp
            })
        );

        MintableToken(pools[poolId].token).mint(address(this), amount);

        MasterChefV2(masterChef).deposit(poolId, amount, to);
    }

    function withdrawFor(
        uint256 poolId,
        uint256 nftId,
        address user
    ) public {
        uint256 depositIndex = validUserDepositIndex[poolId][user];

        UserDeposit memory userDeposit = userDeposits[poolId][user][
            depositIndex
        ];

        require(
            userDeposit.depositTimestamp + pools[poolId].lockDuration <=
                block.timestamp,
            "Staking: DEPOSIT_IS_LOCKED"
        );

        validUserDepositIndex[poolId][user] += 1;

        MasterChefV2(masterChef).withdraw(
            poolId,
            userDeposit.amount,
            address(this)
        );

        MintableToken(pools[poolId].token).burnFrom(address(this), amount);

        IERC721(nft).safeTransferFrom(address(this), user, nftId);
    }

    function emergencyWithdraw(uint256 poolId, address to)
        public
        whenEmergency
    {
        uint256 depositIndex = validUserDepositIndex[poolId][msg.sender];
        uint256 lastDepositIndex = userDeposits[poolId][msg.sender].length;

        UserDeposit memory userDeposit = userDeposits[poolId][msg.sender][
            depositIndex
        ];

        validUserDepositIndex[poolId][msg.sender] = lastDepositIndex;

        MasterChefV2(masterChef).emergencyWithdraw(poolId, address(this));

        for (uint256 i = depositIndex; i < lastDepositIndex; i++) {
            MintableToken(pools[poolId].token).burnFrom(
                address(this),
                getNftValue(userDeposits[poolId][msg.sender][i].nftId)
            );

            IERC721(nft).safeTransferFrom(address(this), to, nftId);
        }
    }
}
