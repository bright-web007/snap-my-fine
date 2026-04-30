export const formatDate = (dateStr: string, includeDay = false) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (includeDay) options.day = 'numeric';
    return date.toLocaleDateString('en-US', options);
};

export const formatReadTime = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min read`;
};

export const getFeaturedImage = (featuredImage: string) => {
    try {
        const parsed = JSON.parse(featuredImage);
        return parsed.src;
    } catch {
        return '';
    }
};
