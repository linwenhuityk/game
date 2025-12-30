function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getQuestions') {
    return getQuestions(e.parameter.count);
  }
  
  return ContentService.createTextOutput("Invalid Action");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    saveResult(data);
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getQuestions(count) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("題目");
  if (!sheet) return errorJSON("Sheet '題目' not found");
  
  const rows = sheet.getDataRange().getValues();
  const header = rows.shift(); // Remove header
  
  // Basic shuffle
  const shuffled = rows.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count || 5);
  
  const questions = selected.map(row => ({
    id: row[0],
    question: row[1],
    options: [row[2], row[3], row[4], row[5]], // A, B, C, D
    correct: row[6] // Answer
  }));
  
  return ContentService.createTextOutput(JSON.stringify(questions))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveResult(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("回答");
  if (!sheet) throw new Error("Sheet '回答' not found");
  
  const id = data.userId;
  const score = data.score;
  const maxScore = data.maxScore;
  const passed = data.passed;
  
  // Check if user exists
  const textFinder = sheet.createTextFinder(id).matchEntireCell(true);
  const foundCell = textFinder.findNext();
  
  if (foundCell) {
    // Update existing user
    const row = foundCell.getRow();
    const currentAttempts = sheet.getRange(row, 2).getValue();
    const currentMax = sheet.getRange(row, 4).getValue();
    
    // Update attempts
    sheet.getRange(row, 2).setValue(currentAttempts + 1);
    
    // Update max score if higher
    if (score > currentMax) {
      sheet.getRange(row, 4).setValue(score);
    }
    
    // Update attempts count handling (logic can be refined based on 'spent attempts')
    sheet.getRange(row, 6).setValue(currentAttempts + 1); // Spent attempts
    sheet.getRange(row, 7).setValue(new Date()); // Last played
    
  } else {
    // New User
    // Columns: ID, Attempts, Total Score(Current?), Max Score, First Pass Score, Spent Attempts, Last Played
    sheet.appendRow([
      id,
      1, // Attempts
      score, // Current Score
      score, // Max Score
      passed ? score : "", // First pass score (if passed)
      1, // Spent attempts
      new Date()
    ]);
  }
}

function errorJSON(msg) {
  return ContentService.createTextOutput(JSON.stringify({error: msg}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Setup function to create sheets if they don't exist
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName("題目")) {
    ss.insertSheet("題目").appendRow(["ID", "Question", "Option A", "Option B", "Option C", "Option D", "Answer"]);
  }
  if (!ss.getSheetByName("回答")) {
    ss.insertSheet("回答").appendRow(["User ID", "Attempts", "Last Score", "High Score", "First Clear Score", "Total Games", "Last Played"]);
  }
}
