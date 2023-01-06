const B = 1024;
const KB = B*B*B;
const MB = B*B;

export const getSize = (size, format = null) => {
    if (format ? format === "Gb" : size > KB) {
        return (size/KB).toFixed(1)+"Gb";
    }
    if (format ? format === "Mb" : size > MB) {
        return (size/MB).toFixed(1)+"Mb";
    }
    if (format ? format === "Kb" : size > B) {
        return (size/B).toFixed(1)+"Kb";
    }
    return size+"B";
}