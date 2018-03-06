// 路由跳转
export function getRedirectPath ({type, avatar}) {
    let url = '/songpanel/new';
    if (!avatar) {
        url = 'geniusinfo';
    }
    return url;
}

// 合并id
export function getChatId (fromId, toId) {
    return [fromId, toId].sort().join('_');
}

//歌词同步
export function formatLyric (text) {
    var lines = text.split('\n'),
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        result = [];
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    }
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function (v, i, a) {
        var time = v.match(pattern),
            value = v.replace(pattern, '');
        time.forEach(function (v1, i1, a1) {
            var t = v1.slice(1, -1).split(':');
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    result.sort(function (a, b) {
        return a[0] - b[0];
    });
    return result;
}

// 格式化歌词
export function formatTime (time) {
    if (!time) {
        return null;
    }
    const duration = parseInt(time, 10);
    let minute = parseInt(duration / 60, 10);
    let sec = duration % 60 + '';
    const isM0 = ':';
    if (minute === 0) {
        minute = '00';
    } else if (minute < 10) {
        minute = '0' + minute;
    }
    if (sec.length === 1) {
        sec = '0' + sec;
    }
    return minute + isM0 + sec;
}