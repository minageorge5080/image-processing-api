import { resizeImage } from "./../utils";
import { promises as fs } from "fs";

describe("Resize image cases", function () {
  it("Fail", (done) => {
    (async function () {
      const response = await resizeImage(
        "./public/images/full/testt.jpg",
        300,
        300
      ).catch((e) => {});
      expect(response).toBeUndefined();
      done();
    })();
  });

  it("Success", (done) => {
    (async function () {
      const response = await resizeImage(
        "./public/images/full/test.jpg",
        300,
        300
      );
      expect(response).toBeDefined();
      done();
    })();
  });

  afterAll(() => {
    fs.rm("./public/images/thumbnail/test(300x300).jpg");
  });
});
