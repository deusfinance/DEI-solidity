// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.6.11;

import "./DEIPool.sol";

contract Pool_HUSD is DEIPool {
    address public HUSD_address;
    constructor(
        address _dei_contract_address,
        address _deus_contract_address,
        address _collateral_address,
        address _creator_address,
        address _trusty_address,
        address _admin_address,
        uint256 _pool_ceiling
    ) 
    DEIPool(_dei_contract_address, _deus_contract_address, _collateral_address, _creator_address, _trusty_address, _admin_address, _pool_ceiling)
    public {
        require(_collateral_address != address(0), "Zero address detected");

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        HUSD_address = _collateral_address;
    }
}
