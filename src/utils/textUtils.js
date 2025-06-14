/**
 * Limits a text to a maximum number of words per sentence
 * @param {string} text - The text to process
 * @param {number} maxWords - Maximum words per sentence (default: 23)
 * @returns {string} - Processed text with limited sentence length
 */
export const limitSentenceLength = (text, maxWords = 23) => {
  if (!text) return '';
  
  // Split into sentences (handles multiple punctuation marks)
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length <= maxWords) return sentence;
    
    // If sentence is too long, split at the last complete word within limit
    return words.slice(0, maxWords).join(' ') + '...';
  }).join(' ');
};

/**
 * Extracts plain text from Contentful rich text content
 * @param {string} rawContent - Raw content from Contentful
 * @returns {string} - Plain text content
 */
const extractPlainText = (rawContent) => {
  if (!rawContent) return '';
  
  try {
    const parsedContent = JSON.parse(rawContent);
    return parsedContent.content
      .map(node => {
        if (node.nodeType === 'paragraph') {
          return node.content
            .map(content => content.value || '')
            .join(' ');
        }
        return '';
      })
      .join(' ')
      .trim();
  } catch (error) {
    console.error('Error parsing content:', error);
    return '';
  }
};

/**
 * Creates a content snippet from raw Contentful rich text
 * @param {string} rawContent - Raw content from Contentful
 * @returns {string} - Processed content snippet
 */
export const createContentSnippet = (rawContent) => {
  if (!rawContent) return '';
  
  const plainText = extractPlainText(rawContent);
  const words = plainText.split(/\s+/);
  
  // Limit to 23 words
  if (words.length > 23) {
    return words.slice(0, 23).join(' ') + '...';
  }
  
  return plainText;
}; 