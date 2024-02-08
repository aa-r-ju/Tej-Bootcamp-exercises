import React from "react";
import "@testing-library/jest-dom";
import { render,fireEvent} from "@testing-library/react";
import BlogForm from "./BlogsForm";

  test("test for new blog form", () => {
    const addBlog = jest.fn();

    const component = render(<BlogForm handleAddBlog={addBlog} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("#form");

    fireEvent.change(title, {
      target: { value: "updatedblog" },
    });

    fireEvent.change(author, {
      target: { value: "AarjuPariyar" },
    });

    fireEvent.change(url, {
      target: { value: "https://search.brave.com/search?q=goblin&source=desktop" },
    });

    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe("updatedblog");
    expect(addBlog.mock.calls[0][0].author).toBe("AarjuPariyar");
    expect(addBlog.mock.calls[0][0].url).toBe("https://search.brave.com/search?q=goblin&source=desktop");
  });