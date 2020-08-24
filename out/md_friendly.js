"use strict";
exports.__esModule = true;
function md_friendly(str) {
    return str
        .replace(/[_]/g, '\\_')
        .replace(/[*]/g, '\\*')
        .replace(/[\[]/g, '\\[')
        .replace(/[\]]/g, '\\]')
        .replace(/[\(]/g, '\\(')
        .replace(/[\)]/g, '\\)')
        .replace(/[~]/g, '\\~')
        .replace(/[`]/g, '\\`')
        .replace(/[>]/g, '\\>')
        .replace(/[#]/g, '\\#')
        .replace(/[+]/g, '\\+')
        .replace(/[-]/g, '\\-')
        .replace(/[=]/g, '\\=')
        .replace(/[|]/g, '\\|')
        .replace(/[{]/g, '\\{')
        .replace(/[}]/g, '\\}')
        .replace(/[\.]/g, '\\.')
        .replace(/[!]/g, '\\!');
}
exports["default"] = md_friendly;
