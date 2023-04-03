const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NftTokenTwo", function () {
     this.timeout(50000); // line 5

     let nftTokenTwo;
     let deployer;
     let acc1;
     let acc2;

     this.beforeEach(async function () {
          // line 12
          const NftTokenTwo = await ethers.getContractFactory("NftTokenTwo");
          [deployer, acc1, acc2] = await ethers.getSigners();

          nftTokenTwo = await NftTokenTwo.deploy();

          //   nftTokenTwo = await NftTokenTwo.attach("0x6bED992aAa79564b56A62c2341DB6C6bC0F5b247");
     });

     it("Should set the right deployer", async function () {
          expect(await nftTokenTwo.owner()).to.equal(deployer.address);
     });

     it("Should mint one NFT", async function () {
          expect(await nftTokenTwo.balanceOf(acc1.address)).to.equal(0);

          const tokenURI = "ipfs://QmdhporNvpUcdzyauqUVTqiw7rDQRXWv3ycf1i6Hcj6tsj"; // line 28
          const tx = await nftTokenTwo.connect(deployer).safeMint(acc1.address, tokenURI);
          await tx.wait(); // line 30

          expect(await nftTokenTwo.balanceOf(acc1.address)).to.equal(1);
     });

     it("Should set the correct tokenURI", async function () {
          const tokenURI_1 = "ipfs://QmdhporNvpUcdzyauqUVTqiw7rDQRXWv3ycf1i6Hcj6tsj/0";
          const tokenURI_2 = "ipfs://QmdhporNvpUcdzyauqUVTqiw7rDQRXWv3ycf1i6Hcj6tsj/1";

          const tx1 = await nftTokenTwo.connect(deployer).safeMint(acc1.address, tokenURI_1);
          await tx1.wait();
          const tx2 = await nftTokenTwo.connect(deployer).safeMint(acc2.address, tokenURI_2);
          await tx2.wait();

          expect(await nftTokenTwo.tokenURI(0)).to.equal(tokenURI_1);
          expect(await nftTokenTwo.tokenURI(1)).to.equal(tokenURI_2);
     });
});
