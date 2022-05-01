import app from "./../index";
import supertest from "supertest";

const request = supertest(app);

describe("Success cases", function () {
  it("Sucess response", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/test.jpg?width=300&height=300"
      );
      expect(response.status).toBe(200);
      done();
    })();
  });
});

describe("failure cases", function () {
  it("No orginal image with this name", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/notfoundname.jpg?width=300&height=300"
      );
      expect(response.status).toBe(404);
      done();
    })();
  });

  it("Exist original image name without extension ", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/test?width=300&height=300"
      );
      expect(response.status).toBe(400);
      done();
    })();
  });

  it("No width paramter", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/test.jpg?height=300"
      );
      expect(response.status).toBe(400);
      done();
    })();
  });

  it("No height paramter", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/test.jpg?width=300"
      );
      expect(response.status).toBe(400);
      done();
    })();
  });

  it("invalid width paramter", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/test.jpg?width=300ee"
      );
      expect(response.status).toBe(400);
      done();
    })();
  });

  it("invalid height paramter", (done) => {
    (async function () {
      const response = await request.get(
        "/public/images/thumbnail/test.jpg?width=300ee"
      );
      expect(response.status).toBe(400);
      done();
    })();
  });
});
