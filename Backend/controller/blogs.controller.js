//Import from database
const dbConfig = require("../database/config");
const fs = require("fs");
//getallBlogs
exports.getAllBlogs = (req, res) => {
  const show_blogs_in = req.query.show_blogs_in;

  const showBlogsInQuery = `WHERE blogs.show_blogs_in="${show_blogs_in}" OR blogs.show_blogs_in="both"`;

  try {
    dbConfig.query(
      ` SELECT blogs.id, blogs.blog_title,blogs.blog_description,blogs.blog_source,blogs.show_blogs_in,
      blogs.blog_image,blogs.category,blogandeventcategories.category_name,blogs.is_active,blogs.blog_tags FROM blogs
      LEFT JOIN blogandeventcategories ON blogs.category=blogandeventcategories.id ${
        show_blogs_in ? showBlogsInQuery : ""
      }`,
      (err, rows, fields) => {
        if (!err) {
          // console.log(rows, "rows");
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};
// old
// exports.getAllBlogs = (req, res) => {
//   try {
//     dbConfig.query(
//      ` SELECT blogs.id as BlogId, blogs.blog_title as BlogTitle,blogs.blog_description as BlogDescription,blogs.blog_source as BlogSource,
//       blogs.blog_image as BlogImage,blogs.category as BlogCategoryId,blogandeventcategories.category_name as BlogCategoryName,blogs.is_active as BlogIsActive FROM blogs
//       LEFT JOIN blogandeventcategories ON blogs.category=blogandeventcategories.id;`,
//       (err, rows, fields) => {
//         if (!err) {
//           console.log(rows, "rows");
//           res.send(rows);
//         } else {
//           console.log(err);
//         }
//       }
//     );
//   } catch (e) {
//     throw e;
//   }
// };

//getallBlogs
exports.getcountsblog = (req, res) => {
  try {
    dbConfig.query(
      `SELECT 
      blog_tags,
      count(blog_tags) as tags_Count
      FROM 
      blogs
      GROUP BY blog_tags`,
      (err, rows, fields) => {
        if (!err) {
          // console.log(rows, "line 37 blog_tagscount");
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

//getOne blog
exports.getOneBlog = (req, res) => {
  if (!req.query?.tag && !req.query?.id) {
    return res.json({ details: null, relatedTemplesByTags: null });
  }

  try {
    const mainQueryCondition = req.query?.tag
      ? `blog_tags LIKE '%${req.query?.tag}%'`
      : `id = "${req.query.id}"`;

    dbConfig.query(
      `SELECT * From blogs WHERE ${mainQueryCondition}`,
      (err, rows, fields) => {
        if (!err) {
          // console.log("Get one blog", rows[0]);

          const data = rows[0];
          console.log("My Data", data);

          if (!data) {
            return res.json({ details: null, relatedTemplesByTags: null });
          }

          if (data?.blog_tags === "") {
            return res.json({ details: rows[0], relatedTemplesByTags: null });
          }

          const tags = data.blog_tags.split(",");

          let appendQueries = ``;

          tags.forEach((item, index) => {
            appendQueries += `blog_tags LIKE '%${item.toLowerCase()}%' ${
              index + 1 < tags.length ? "OR " : ""
            }`;
          });

          // console.log("Append Queries", appendQueries, data.id);

          const findByExactTag = `blog_tags LIKE '%${req.query?.tag?.toLowerCase()}%'`;

          dbConfig.query(
            `SELECT id,blog_title,blog_tags FROM blogs WHERE ${
              req.query?.tag ? findByExactTag : appendQueries
            }`,
            (error, rowResult) => {
              if (!error) {
                res.json({ details: rows[0], relatedTemplesByTags: rowResult });
              }
            }
          );
        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

// get all the blogs related temples by tags
// exports.getTemplesByTags = (req, res) => {
//   try {
//     const query=`SELECT `;
//   } catch (error) {}
// };

//create blog
exports.createBlog = (req, res) => {
  const blog_title = req.body.blog_title;
  const blog_tags = req.body.blog_tags;
  const blog_description = req.body.blog_description;
  const blog_source = req.body.blog_source;
  const category = req.body.category;
  const created_by = req.body.created_by;
  const is_active = req.body.is_active;
  const show_blogs_in = req.body.show_blogs_in || "both";

  console.log("BLOG Image", blog_image);

  if (req.files != undefined) {
    if (req.files.blog_image != undefined) {
      var blogfile = req.files.blog_image;
      var path = "/public/blog_image/";
      var blog_imageName = blogfile.name;
      var blog_image = path + blog_imageName;
      console.log(req.files, "files");
      blogfile.mv("./public/blog_image/" + blog_imageName, function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  } else {
    console.log("Please Upload Image !!!");
  }

  var sql = `INSERT INTO blogs(blog_title,blog_tags,blog_source,blog_description,category,created_by,is_active ,blog_image,show_blogs_in)
  VALUES("${blog_title}","${blog_tags}","${blog_source}","${blog_description}","${category}","${created_by}","${is_active}","${blog_image}","${show_blogs_in}")`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) {
        console.log("Blogrows", rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    throw e;
  }
};

//deleteBlog
exports.deleteBlog = (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM blogs WHERE id='${id}'`;
    dbConfig.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    throw e;
  }
};

exports.updateBlog = (req, res) => {
  try {
    const blog_title = req.body.blog_title;
    const blog_tags = req.body.blog_tags;
    const blog_description = req.body.blog_description;
    const blog_source = req.body.blog_source;
    const category = req.body.category;
    const created_by = req.body.created_by;
    const is_active = req.body.is_active;
    const show_blogs_in = req.body.show_blogs_in || "both";

    console.log("Show blogs in", show_blogs_in);

    if (req.files != undefined) {
      if (req.files.blog_image != undefined) {
        var blogfile = req.files.blog_image;
        var path = "/public/blog_image/";
        var blog_imageName = blogfile.name;
        var blog_image = path + blog_imageName;
        blogfile.mv("./public/blog_image/" + blog_imageName, function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        var blog_image = "No image";
      }
    } else {
      var blog_image = req.body.blog_image;
      console.log("Please Upload Image !!!");
    }

    var sql = `UPDATE blogs
    SET
    blog_title = "${blog_title}",
    blog_description = "${blog_description}",
    blog_source = "${blog_source}",
    blog_image = "${blog_image}",
    blog_tags = "${blog_tags}",
    category = "${category}",
    created_by = "${created_by}",
    is_active = "${is_active}",
    show_blogs_in="${show_blogs_in}"
    WHERE id = "${req.params.id}";`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};
