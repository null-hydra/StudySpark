const sourceText = document.querySelector('#sourceText');
const wordCount = document.querySelector('#wordCount');
const resultsSection = document.querySelector('#resultsSection');
const resultTitle = document.querySelector('#resultTitle');
const resultContent = document.querySelector('#resultContent');
const resultHint = document.querySelector('#resultHint');
let lastPlainText = '';

function splitSentences(text) {
  return text.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s => s.trim()).filter(Boolean) || [];
}
function words(text) {
  return (text.toLowerCase().match(/[a-z0-9]+(?:['’-][a-z0-9]+)*/g) || []);
}
function updateWordCount() {
  const count = words(sourceText.value).length;
  wordCount.textContent = `${count} ${count === 1 ? 'word' : 'words'}`;
}
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function showMessage(title, html, plain, hint) {
  resultTitle.textContent = title;
  resultContent.innerHTML = html;
  lastPlainText = plain;
  resultHint.textContent = hint;
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({behavior:'smooth', block:'start'});
}
function frequencyMap(text) {
  const stop = new Set(('a an and are as at be been being but by can could did do does for from had has have he her hers him his how i if in into is it its may me might more most my no not of on or our ours she should so than that the their theirs them then there these they this those to too up us was we were what when where which who will with would you your').split(' '));
  const counts = new Map();
  for (const word of words(text)) {
    if (word.length < 3 || stop.has(word)) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return counts;
}
function summarize(text) {
  const sentences = splitSentences(text);
  if (sentences.length <= 2) return sentences;
  const freq = frequencyMap(text);
  const scored = sentences.map((sentence, index) => {
    const terms = words(sentence);
    const score = terms.reduce((sum, word) => sum + (freq.get(word) || 0), 0) / Math.max(terms.length, 1);
    return {sentence, index, score};
  });
  const take = Math.max(2, Math.ceil(sentences.length * 0.35));
  return scored.sort((a,b) => b.score-a.score).slice(0,take).sort((a,b) => a.index-b.index).map(item => item.sentence);
}
function extractKeyPoints(text) {
  const sentences = splitSentences(text);
  const freq = frequencyMap(text);
  return sentences.map((sentence, index) => {
    const terms = words(sentence);
    const score = terms.reduce((sum, word) => sum + (freq.get(word) || 0), 0) / Math.max(terms.length, 1);
    return {sentence, index, score};
  }).sort((a,b) => b.score-a.score).slice(0, Math.min(5, sentences.length)).sort((a,b) => a.index-b.index).map(item => item.sentence);
}
function makeQuestions(text) {
  const sentences = splitSentences(text).filter(s => words(s).length >= 5);
  return sentences.slice(0, 5).map(sentence => {
    const cleaned = sentence.replace(/[.!?]+$/, '');
    const first = cleaned.split(/\s+/).slice(0, 4).join(' ');
    return `What is the main idea behind: “${first}${cleaned.split(/\s+/).length > 4 ? '…' : ''}”?`;
  });
}
function runAction(action) {
  const text = sourceText.value.trim();
  if (words(text).length < 8) {
    sourceText.focus();
    showMessage('Add a little more text', '<p>Please paste at least a short paragraph (around 8 words or more) so StudySpark has material to work with.</p>', '', 'Tip: use class notes or a paragraph you are allowed to use.');
    return;
  }
  if (action === 'summary') {
    const items = summarize(text);
    showMessage('Your concise notes', `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`, items.join('\n\n'), 'This is extractive summarization: it selects sentences from your text instead of generating new facts.');
  } else if (action === 'keypoints') {
    const items = extractKeyPoints(text);
    showMessage('Key points to review', `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`, items.map(item => `• ${item}`).join('\n'), 'Key points are estimated from repeated words and sentence length; review them for accuracy.');
  } else {
    const items = makeQuestions(text);
    showMessage('Revision prompts', `<ol>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ol>`, items.map((item, i) => `${i+1}. ${item}`).join('\n'), 'These prompts are generated from sentence openings. They are a prototype, not AI-generated comprehension questions.');
  }
}
sourceText.addEventListener('input', updateWordCount);
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => runAction(button.dataset.action)));
document.querySelector('#clearBtn').addEventListener('click', () => {
  sourceText.value = '';
  updateWordCount();
  sourceText.focus();
  resultsSection.hidden = true;
});
document.querySelector('#copyBtn').addEventListener('click', async () => {
  if (!lastPlainText) return;
  const button = document.querySelector('#copyBtn');
  try {
    await navigator.clipboard.writeText(lastPlainText);
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy result', 1400);
  } catch {
    resultHint.textContent = 'Clipboard access was blocked by your browser. Select and copy the result manually.';
  }
});
updateWordCount();
