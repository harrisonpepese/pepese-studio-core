import { Player } from "./player";

describe("Player tests", () => {
  let player;
  beforeEach(() => {
    player = new Player({
      id: "1",
      accountId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
      gameCoin: 0,
      pets: [],
      isOnline: false,
    });
  });
  it("should add 100 gameCoin", () => {
    player.addGameCoin(100);
    expect(player.gameCoin).toEqual(100);
  });
  it("should reduce 100 gameCoin", () => {
    player.reduceGameCoin(100);
    expect(player.gameCoin).toEqual(-100);
  });
});
