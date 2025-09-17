import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const { status, message } = rpcError as { status: number | string; message: string };
      const httpStatus = isNaN(+status) ? 400 : +status;
      return response.status(httpStatus).json({ status: httpStatus, message });
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}