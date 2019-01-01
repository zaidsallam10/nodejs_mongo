process.env.NODE_ENV = "testing";

import { Author, IAuthor, Post } from "../../models/models";
import * as chai from "chai";

const expect = chai.expect;

describe("Posts", () => {

  it("should insert new post", (done: Function) => {

    const author = new Author();
    author.name = "John";
    author.description = "He is writer";

    author.save(async (err: Error, _res: IAuthor) => {

      expect(_res).to.be.an("object");
      expect(_res.name).to.be.equal("John");

      await Post.create({
        author: _res._id,
        title: "Tile 1",
        description: "Lorem ipsum..."
      }, {
        author: _res._id,
        title: "Tile 2",
        description: "Lorem ipsum..."
      });

      const posts = await Post.findAllByAuthor(_res._id.toString());

      expect(posts).to.be.length(2);
      done();
    });

  });

});
