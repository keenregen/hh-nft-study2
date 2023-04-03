const hre = require("hardhat");

async function main() {
     const NftTokenTwo = await hre.ethers.getContractFactory("NftTokenTwo");
     const nftTokenTwo = await NftTokenTwo.deploy();

     await nftTokenTwo.deployed();

     console.log("NftTokenTwo deployed to:", nftTokenTwo.address);
}

main()
     .then(() => process.exit(0))
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
