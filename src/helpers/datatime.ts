export function formatDuration(seconds: number | undefined): string {
    if (!seconds) return '0m';
    if (isNaN(seconds) || seconds < 0) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
}
