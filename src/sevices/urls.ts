import knex from "../config/knex";

export const createShortURL = async (
  body: { url: string; id?: string },
  user_id: number
) => {
  if (!body.url) {
    throw new Error("URL is required");
  }
  if (body.id) {
    const currentRecord = await knex("urls").where({ id: body.id }).first();
    if (currentRecord) {
      throw new Error(
        "The ID that you provided already exists in the database"
      );
    }
  }
  const results = await knex("urls").insert(
    { url: body.url, id: body.id, user_id },
    "*"
  );

  return results[0];
};

export const resolveURL = async (id: string) => {
  const url = await knex("urls").where({ id }).select(["url"]).first();
  if (!url) {
    throw new Error("The ID is not valid");
  }

  return url.url;
};
export const updateURL = async (
  id: string,
  body: { url: string },
  user_id: number
) => {
  if (!body.url) {
    throw new Error("The URL is required");
  }

  const url = await knex("urls").where({ id }).select(["user_id"]).first();
  if (!url) {
    throw new Error("URL not found");
  }

  if (url.user_id !== user_id) {
    throw new Error("You don't have the privilege to update this url");
  }

  const results = await knex("urls")
    .where({ id })
    .update({ url: body.url }, "*")
    .first();

  return results;
};

export const deleteURL = async (id: string, user_id: number) => {
  const url = await knex("urls").where({ id }).select(["user_id"]).first();
  if (!url) {
    throw new Error("URL not found");
  }

  if (url.user_id !== user_id) {
    throw new Error("You don't have the privilege to update this url");
  }

  await knex("urls").where({ id }).delete();
};

export const getUrls = async (user_id: number, limit = 15, offset = 0) => {
  const results = await knex("urls")
    .where({ user_id })
    .limit(limit)
    .offset(offset);

    return results; 
};

