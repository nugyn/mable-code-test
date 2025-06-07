import { IAccountBalanceService } from "src/services/IAccountBalance.service";
import AccountBalanceController from "./AccountBalance.controller";
import { Request, Response } from "express";

describe("Account Balance Controller", () => {
  let mockService: jest.Mocked<IAccountBalanceService>;
  let mockReq: jest.Mocked<Request>;
  let mockRes: jest.Mocked<Response>;

  beforeEach(() => {
    mockService = {
      getAllAccountBalances: jest.fn(),
    } as unknown as jest.Mocked<IAccountBalanceService>;
    mockReq = {} as jest.Mocked<Request>
    mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<Response>;
  });

  it("will get all account balances", () => {
    //Arrange
    const controller = new AccountBalanceController(mockService);
    //Act

    controller.getAllAccountBalances(mockReq, mockRes);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(200)
  });
});
