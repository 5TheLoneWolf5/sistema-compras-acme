import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CrudButtons from "../componentes/CrudButtons";
import "@testing-library/jest-dom";

describe("CrudButtons", () => {
  it("renders on page", async () => {

    render(<CrudButtons />);

    await screen.findByTitle("Criar");

    expect(screen.getByTitle("Criar")).toBeInTheDocument();

    // screen.debug();

  });
});

// Success: changing from .js to .jsx.