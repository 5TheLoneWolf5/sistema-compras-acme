import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import ExportTableCSV from "../componentes/ExportTableCSV";

describe("Compras", () => {
  it("has text on page", async () => {

    render(<ExportTableCSV />);

    await screen.findByText("Exportar para CSV");

    expect(screen.getByText("Exportar para CSV")).toBeInTheDocument();

    // screen.debug();

  });
});