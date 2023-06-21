/* eslint-disable @typescript-eslint/no-explicit-any */
import Validator from "validatorjs";
import httpError  from "http-errors";

type RequestBody = { [key: string]: any };

const validateBody = (
  body: RequestBody,
  validation_schema: Validator.Rules
) => {
  const validator = new Validator(body, validation_schema);
  if (validator.fails()) {
    const errors = validator.errors.all();
    const aggregatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      aggregatedErrors.push(validator.errors.first(key) as string);
    });
    throw new httpError.BadRequest(aggregatedErrors.join(" , "))
  } else {
    return true;
  }
};

export const validateCreateShortURL = async (body: RequestBody) =>
  validateBody(body, {
    url: "url|required",
    id: "string|min:5|max:10", 
  });

export const validateUpdateShortURL = async (body: RequestBody) =>
  validateBody(body, {
    url: "url|required",
  });
