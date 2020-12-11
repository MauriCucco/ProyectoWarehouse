const fs = require("fs");
const { type } = require("os");
const { v4: uuid } = require("uuid");
const allowImageExtension = ["png", "jpg", "jpeg"];

/*EJEMPLO de req.file:
{
  fieldname: 'imagen',
  originalname: 'Emo.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './public/tmp',
  filename: '2278e708401901887696c7154a339ccd',
  path: 'public\\tmp\\2278e708401901887696c7154a339ccd',
  size: 5079
}
*/

const saveFile = (
  { mimetype, path, size },
  allowImageExtension,
  destFolder = "./public/images"
) => {
  try {
    const [type, extension] = mimetype.split("/");
    if (!allowImageExtension.includes(extension)) throw "Formato no permitido";

    const uid = uuid();
    const fileName = `${uid}.${extension}`;
    const fileNameOut = `${destFolder}/${fileName}`;

    fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
    fs.unlink(path, (error) => {
      if (error) throw "No se pudo borrar el archivo temporal";
    });

    //return uid;
    return fileName;
  } catch (error) {
    throw error;
  }
};

const imgFile = (file) => {
  return saveFile(file, allowImageExtension);
};

module.exports = { imgFile };
