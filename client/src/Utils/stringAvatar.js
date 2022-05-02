String.prototype.toColor = function() {
    var colors = ["#D82148", "#789395", "#FFB2A6", "#524A4E"]

    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
    return colors[hash];
}

export function stringAvatar(name) {
    return {
        sx: {
            width: 41,
            height: 41,
            alignItems: 'center'
        },
        children: `${name.toString().split(' ')[0][0]}${name.toString().split(' ')[1][0]}`,
    };
}