/**
 * Distribute accrued interest to the DAO and governance stakers.
 * There is no reward for calling the method
 */

import { Account, Vault, VAULT_IDS } from "@xbacked-dao/xbacked-sdk";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const settleInterest = async ({ account, vault }) => {
  console.log(`Settling interest... ${new Date().toString()}`);
  const isSettled = await account.settleInterest({ vault });

  if (!isSettled) return false;

  isSettled && console.log("Interest was successfully settled");
};

const taskRunner = async ({
  sleepDuration = "",
  network = "",
  passPhrase = "",
}) => {
  // Check for null parameters
  if (!sleepDuration || !network || !passPhrase)
    throw new Error("Some required parameters are missing!");

  console.log("Instantiating account...");
  // Instantiate a new Account
  const account = new Account({
    mnemonic: passPhrase,
    network,
  });

  // Instantiate a new Vault
  const vault = new Vault({ id: VAULT_IDS.TestNet.algo });

  // Settle Interest
  do {
    try {
      console.log("Sleeping...");
      await sleep(sleepDuration);
      await settleInterest({ account, vault });
    } catch (e) {
      console.log(e);
    }
  } while (true);
};

export default taskRunner;
