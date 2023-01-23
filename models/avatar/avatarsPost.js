const path = require("path");
const Jimp = require("jimp");
const fs = require("fs").promises;
const updateCurrent = require("../auth/updateCurrent");

const avatarPost = async (req, res, next) => {
  try {
    const { headers, body, file, user } = req;
    console.log(body);
    if (!file) {
      return { status: 500, message: "file" };
    }
    await Jimp.read(tempPath)
      .then((image) => {
        image.cover(250, 250).write(tempPath);
      })
      .catch((err) => {
        console.error(err);
      });
    const tempPath = path.resolve("users", "../../temp", file.filename);
    req.file.tempPath = tempPath;
    const avatar = path.join(
      "../../public/avatars",
      `${user.id}_${file.originalname}`
    );
    const newPath = path.resolve("users", "../../public/avatars", avatar);
    await fs.rename(tempPath, newPath);

    const avatarURL = `http://${headers.host}/${avatar}`;

    await resizeImg(newPath, 250);

    const updadatedUserData = await updateCurrent({
      id: user.id,
      avatarURL,
    });

    res.json({
      status: 201,
      data: {
        title: body.avatarName,
        url: updadatedUserData.avatarURL,
      },
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Not authorized",
    });
    next(error);
  }
};

module.exports = avatarPost;
