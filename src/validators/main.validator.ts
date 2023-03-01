import { ClassType, transformAndValidate } from 'class-transformer-validator'
import { Request, Response, NextFunction } from 'express'
import { HttpCode } from '../constants/error.http'

export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
  classType: ClassType<any>
): Promise<void> => {
  try {
    if (Array.isArray(req.body)) {
      for (const e of req.body) {
        await transformAndValidate(classType, e)
      }
    } else {
      await transformAndValidate(classType, req.body)
    }
    next()
  } catch (err) {
    res.writeHead(HttpCode.BAD_REQUEST)
    res.write(
      JSON.stringify({
        message: 'Validation payload error',
        constraints: Object.values(err[0].constraints),
      })
    )
    res.end()
  }
}

// export const validateParams = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   classType: ClassType<any>
// ): Promise<void> => {
//   try {
//     await transformAndValidate(classType, req.params);
//     next();
//   } catch (err) {
//     res.writeHead(HttpCode.BAD_REQUEST);
//     res.write(
//       JSON.stringify({
//         message: REQUEST_PAYLOAD_VALIDATION_ERROR,
//         constraints: Object.values(err[0].constraints)
//       })
//     );
//     res.end();
//   }
// };
