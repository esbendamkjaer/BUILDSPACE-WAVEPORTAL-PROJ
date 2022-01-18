const hre = require("hardhat");

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log(`Deployed WavePortal at ${waveContract.address}`);
    console.log(`Deployed by: ${owner.address}`);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address,
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance),
    );

    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address,
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance),
    );

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();