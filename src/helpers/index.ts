import { Response } from "express";

export class ResponseHelper {

  public success(res: Response, data: any, message = "successful", code = 200) {
    return ResponseHelper.buildResponse(res, data, true, message, code);
  }

  public error(res: Response, data: any, message = "failed", code = 400) {
    return ResponseHelper.buildResponse(res, data, false, message, code);
  }

  private static buildResponse(res: Response, data: any, success: boolean, message: string, code: number) {
    if (success) {
      const body = {
          code,
          data,
          message,
          success,
      };
      return res.json(body);
    } else if (code === 404) {
      data = (data) ? data : {};
      const body = {
          code,
          data,
          message,
          success,
      };
      return res.status(code).json(body);
    } else {
      const error = data;
      const body = {
          code,
          error,
          message,
          success,
      };
      return res.status(code).json(body);
    }
  }
}
