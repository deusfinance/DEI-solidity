const { deploy } = require('../helpers/deploy_contract.js')

module.exports = async ({
  deiAddress,
  deusAddress,
  collateralAddress,
  muonAddress,
  adminAddress,
  minimumRequiredSignatures,
  collateralRedemptionDelay,
  deusRedemptionDelay,
  poolCeiling,
  libraryAddress,
  appId,
}) => {
  const contractName = 'contracts/Pool/PoolV2.sol:DEIPool'
  const deployer = process.env.MAIN_DEPLOYER
  const deployedPool = await deploy({
    deployer: deployer,
    contractName: contractName,
    constructorArguments: [
      deiAddress,
      deusAddress,
      collateralAddress,
      muonAddress,
      libraryAddress,
      adminAddress,
      minimumRequiredSignatures,
      collateralRedemptionDelay,
      deusRedemptionDelay,
      poolCeiling,
      appId,
    ],
  })
  const poolInstance = await hre.ethers.getContractFactory(contractName)
  return poolInstance.attach(deployedPool.address)
}
