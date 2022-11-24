const mustache = require('mustache');
const path = require('path');
const fs = require('fs');

exports.makeEmailTemplate = (templateName, data) => {
try {
    const templatePath = path.join(__dirname, `../template/${templateName}`);
	const content = fs.readFileSync(templatePath, 'utf-8');
	const output = mustache.render(content, data);
	//   convert the output to base64 uriencoded data for sending
	const encodedOutput = Buffer.from(encodeURIComponent(output)).toString('base64');
	return encodedOutput;
} catch (error) {
    console.log({error});
    return
}};