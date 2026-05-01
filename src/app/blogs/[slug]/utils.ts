import sanitizeHtml from 'sanitize-html';
import { formatDate as formatDateBase } from '@/helpers/blog';
export { formatReadTime, getFeaturedImage } from '@/helpers/blog';

export const formatDate = formatDateBase;

const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['svg', 'path', 'div', 'span']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': [
      ...(sanitizeHtml.defaults.allowedAttributes['*'] || []),
      'class',
      'style',
      'viewBox',
      'width',
      'height',
      'fill',
      'stroke',
      'stroke-width',
      'stroke-linecap',
      'stroke-linejoin',
      'd',
      'xmlns',
    ],
  },
};

export const transformContent = (html: string) => {
  // Transform numbered steps into styled step items. This supports single and multi-digit step numbering.
  html = html.replace(
    /<p><strong>(\d{1,})\s+(.+?)<\/strong><\/p>\s*<p>(.+?)<\/p>/g,
    `<div class="blog-step-item"><div class="blog-step-number">$1</div><div class="blog-step-content"><strong>$2</strong><p>$3</p></div></div>`
  );

  // Wrap consecutive step items in a stepList container
  html = html.replace(
    /((?:<div class="[^\"]*blog-step-item[^\"]*">[\s\S]*?<\/div><\/div>\s*)+)/g,
    `<div class="blog-step-list">$1</div>`
  );

  // Transform success box: matches a bold line + paragraph that are wrapped in
  // a <!-- success-box --> HTML comment marker. This avoids false positives from
  // positional matching. CMS content should include the marker explicitly.
  // Fallback behavior is only for legacy content without the marker.
  html = html.replace(
    /<!--\s*success-box\s*-->\s*<p><strong>([^<]+)<\/strong><\/p>\s*<p>([^<]+)<\/p>/g,
    `<div class="blog-success-box"><div class="blog-success-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="blog-success-text"><strong>$1</strong><p>$2</p></div></div>`
  );

  // Keyword-based fallback for content without the HTML comment marker
  html = html.replace(
    /<p><strong>((?=[^<]*(?:free|cost nothing|don't commit))[^<]+)<\/strong><\/p>\s*<p>((?=[^<]*(?:challeng|escalat|cost))[^<]+)<\/p>/gi,
    (match, title, body) => {
      if (match.includes('blog-success-box')) return match;
      return `<div class="blog-success-box"><div class="blog-success-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="blog-success-text"><strong>${title}</strong><p>${body}</p></div></div>`;
    }
  );

  // Transform blockquote: em followed by small
  html = html.replace(
    /<p><em>(.+?)<\/em><\/p>\s*<p><small>(.+?)<\/small><\/p>/g,
    `<div class="blog-quote"><em>$1</em></div><div class="blog-quote-source">$2</div>`
  );

  // Add "Key takeaways" title before the first ul
  html = html.replace(
    /<h2>Key takeaways<\/h2>\s*<ul>/,
    `<div class="blog-key-takeaways"><div class="blog-key-takeaways-title"><span style="display:inline-block;width:4px;height:20px;background:#2563EB;border-radius:2px"></span> Key takeaways</div><ul>`
  );

  // Close the keyTakeaways wrapper after the ul
  html = html.replace(
    /(<div class="[^\"]*blog-key-takeaways[^\"]*">[\s\S]*?<\/ul>)/,
    `$1</div>`
  );

  return sanitizeHtml(html, sanitizeOptions);
};
