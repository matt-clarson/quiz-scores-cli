import * as utils from "../utils";

describe("utils", () => {
  describe(".wrapText()", () => {
    it("should wrap text using default padding", () => {
      const text = "some text that is longer than the given width";
      const width = 30;
      expect(utils.wrapText(text, width)).toMatchInlineSnapshot(`
        Array [
          "some text that is longer",
          "than the given width",
        ]
      `);
    });

    it("should wrap text using padding", () => {
      const text = "some text that is longer than the given width";
      const width = 30;
      const padding = 3;
      expect(utils.wrapText(text, width, padding)).toMatchInlineSnapshot(`
        Array [
          "some text that is",
          "longer than the given",
          "width",
        ]
      `);
    });

    it('should handle short text input', () => {
      const text = 'short text';
      const width = 30;
      expect(utils.wrapText(text, width)).toStrictEqual([text]);
    })
  });
});
