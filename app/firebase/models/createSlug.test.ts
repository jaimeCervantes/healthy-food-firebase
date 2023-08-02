// @vitest-environment node
import { vi, expect } from "vitest";
import { createSlug, collections } from "./posts.server";

vi.mock("../db.server");

describe("createSlug", () => {
  it('should receive a "title" string and a collection reference to verify if already exists', async () => {
    const title = "¿Cómo se escribe la eñe?";
    const slug = await createSlug(title, collections.posts());

    expect(slug).toBe("como-se-escribe-la-ene");
  });
});
