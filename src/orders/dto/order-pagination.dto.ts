import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "generated/prisma";
import { PaginationDto } from "src/common copy";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatus, { message: `Status must be one of the following values: ${Object.values(OrderStatus).join(', ')}` })
    status: OrderStatus
}