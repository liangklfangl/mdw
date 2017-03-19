const path = require('path');
const fs = require('fs');
const mkdirp = require("mkdirp");
export default function generateDir(outputFile){
	const filePath = path.resolve(outputFile);
	mkdirp(filePath,function(err){
      if (err) console.error("output destination invalid",err)
      else{}
	});
}