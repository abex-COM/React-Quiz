// functions/fakeAPI.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, 'question.json');
  const data = fs.readFileSync(filePath, 'utf8');
  
  return {
    statusCode: 200,
    body: data,
  };
};
