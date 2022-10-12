const { ethers } = require("ethers");

(async () => {
    const rpc = "https://matic-mumbai.chainstacklabs.com";
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    while (true) {
        try {
            const lattestBlock = await provider.getBlock("latest");
            lattestBlock.transactions.forEach(async (txHash) => {
                const tx = await provider.getTransaction(txHash);
                if (
                    !!tx.to &&
                    tx.to.toLowerCase() ===
                        "0x9702ddCD32d351A378639eA4e0F25Cf820c0BC7E".toLowerCase()
                ) {
                    console.log("transaction found!!!");
                    console.log({
                        hash: tx.hash,
                        from: tx.from,
                        value: ethers.utils.formatEther(tx.value),
                    });
                }
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }
})();
