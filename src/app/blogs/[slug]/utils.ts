import { formatDate as formatDateBase } from '@/helpers/blog';
export { formatReadTime, getFeaturedImage } from '@/helpers/blog';

export const formatDate = (dateStr: string) => formatDateBase(dateStr, true);

export const transformContent = (html: string) => {
  // Transform numbered steps (01-09) into styled step items
  html = html.replace(
    /<p><strong>(0\d)\s+(.+?)<\/strong><\/p>\s*<p>(.+?)<\/p>/g,
    `<div class="blog-step-item"><div class="blog-step-number">$1</div><div class="blog-step-content"><strong>$2</strong><p>$3</p></div></div>`
  );

  // Wrap consecutive step items in a stepList container
  html = html.replace(
    /((?:<div class="[^"]*blog-step-item[^"]*">[\s\S]*?<\/div><\/div>\s*)+)/g,
    `<div class="blog-step-list">$1</div>`
  );

  // Transform success box pattern: a standalone bold line followed by a paragraph
  html = html.replace(
    /<p><strong>([^<]+)<\/strong><\/p>\s*<p>([^<]+)<\/p>(?=\s*$|\s*<\/)/g,
    `<div class="blog-success-box"><div class="blog-success-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="blog-success-text"><strong>$1</strong><p>$2</p></div></div>`
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
    /(<div class="[^"]*blog-key-takeaways[^"]*">[\s\S]*?<\/ul>)/,
    `$1</div>`
  );

  return html;
};
