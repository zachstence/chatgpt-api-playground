import { chat } from "./client";

const main = async (): Promise<void> => {
  const response = await chat("why r u so bad");
  console.log(response);
};

main();
