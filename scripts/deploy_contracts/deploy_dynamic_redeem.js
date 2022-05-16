const { deploy } = require('../helpers/deploy_contract.js')

module.exports = async ({
  deiAddress,
  deusAddress,
  collateralAddress,
  muonAddress,
  adminAddress,
  minimumRequiredSignatures,
  collateralRedemptionDelay,
  poolCeiling,
  libraryAddress,
  appId,
}) => {
  const contractName = 'contracts/Pool/DynamicRedeem.sol:DynamicRedeem'
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
      poolCeiling,
      appId,
    ],
  })
  const dynamicRedeemInstance = await hre.ethers.getContractFactory(contractName)
  return dynamicRedeemInstance.attach(deployedPool.address)
}
