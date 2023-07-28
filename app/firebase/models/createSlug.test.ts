// @vitest-environment node
import { vi, expect } from "vitest";
import { createSlug, collections } from "./posts.server";

vi.mock("../db.server");

describe("createSlug", () => {
  it('should receive a "title" string and a collection to verify if already exists', async () => {
    const title = "Ensalada de frutas";
    const slug = await createSlug(title, collections.posts());

    expect(slug).toBe("ensalada-de-frutas");
  });
});
