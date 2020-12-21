async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

beforeAll(async () => {
  console.log(">>> beforeAll - start");
  await sleep(800);
  console.log(">>> beforeAll - end");
});

describe("a long time running promise in beforeEach", () => {
  beforeEach(async () => {
    console.log(">>> beforeEach - start");
    await sleep(800);
    console.log(">>> beforeEach - end");
  });
  it("should never run", () => {});
});
