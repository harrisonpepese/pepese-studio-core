import { EUserRole } from "../enum";
import * as bcript from "bcrypt";
import { User } from "./user";
const userAttributes = {
  name: "teste teste",
  email: "teste@teste.com",
  password: undefined,
  pepeseCoin: 0,
  role: EUserRole.player,
};
describe("User tests", () => {
  let user;
  beforeEach(async () => {
    userAttributes.password = await bcript.hash(
      "123456",
      await bcript.genSalt()
    );
    user = new User(userAttributes);
  });

  it("should change password", async () => {
    const newPassword = "654321";
    await user.changePassword("123456", newPassword);
    expect(user.password).not.toEqual("123456");
  });

  it("should'nt change password", async () => {
    expect(() => user.changePassword("123456", "123456")).rejects.toThrow();
  });

  it("should verify password", async () => {
    const result = await user.verifyPassword("123456");
    expect(result).toEqual(true);
  });
});
